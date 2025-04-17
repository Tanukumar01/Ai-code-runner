const vscode = require('vscode');
const fetch = require('node-fetch');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('✅ AI Code Runner is now active!');

	const disposable = vscode.commands.registerCommand('ai-code-runner.generateCode', async function () {
		const task = await vscode.window.showInputBox({ prompt: '💬 What do you want the AI to do?' });
		if (!task) return;

		const language = await vscode.window.showQuickPick(['JavaScript', 'C', 'C++'], {
			placeHolder: 'Select the programming language'
		});
		if (!language) return;

		const extMap = { JavaScript: 'js', C: 'c', 'C++': 'cpp' };
		const fileExt = extMap[language];

		let satisfied = false;
		let basePrompt = `Write a ${language} program to: ${task}.\nRespond with ONLY code inside triple backticks.`;
		let currentCode = "";

		while (!satisfied) {
			vscode.window.showInformationMessage("🧠 Generating code...");

			try {
				const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer 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',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						model: 'openai/gpt-3.5-turbo',
						messages: [{ role: 'user', content: basePrompt }],
						temperature: 0.7
					})
				});

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(`API Error (${response.status}): ${errorText}`);
				}

				const result = await response.json();

				if (!result.choices || !result.choices[0]?.message?.content) {
					throw new Error("⚠️ Invalid AI response format.");
				}

				const fullText = result.choices[0].message.content;
				const match = fullText.match(/```(?:\w+)?\n([\s\S]*?)```/);
				currentCode = match ? match[1] : fullText;

				const doc = await vscode.workspace.openTextDocument({
					content: currentCode,
					language: language.toLowerCase().replace("++", "pp")
				});
				await vscode.window.showTextDocument(doc);
			} catch (err) {
				vscode.window.showErrorMessage("❌ Failed to fetch code from AI: " + err.message);
				return;
			}

			const action = await vscode.window.showQuickPick(['Run Code', 'Refine Code', 'Cancel'], {
				placeHolder: 'What do you want to do with the code?'
			});

			if (action === 'Cancel') return;

			if (action === 'Run Code') {
				const fileName = `task.${fileExt}`;
				const folder = vscode.workspace.workspaceFolders?.[0]?.uri || vscode.Uri.file('.');
				const fileUri = vscode.Uri.joinPath(folder, fileName);

				await vscode.workspace.fs.writeFile(fileUri, Buffer.from(currentCode, 'utf-8'));

				const terminal = vscode.window.createTerminal("AI Code Runner");
				terminal.show();

				const runCmd = language === 'JavaScript'
					? `node ${fileName}`
					: language === 'C'
						? `gcc ${fileName} -o task && ./task`
						: `g++ ${fileName} -o task && ./task`;

				terminal.sendText(runCmd);
			}

			if (action === 'Refine Code') {
				const feedback = await vscode.window.showInputBox({ prompt: '🛠️ What should be improved or changed?' });
				if (feedback) {
					basePrompt += `\n\n📝 USER FEEDBACK: ${feedback}\n\nUpdate the code accordingly.`;
				}
			}

			const confirm = await vscode.window.showQuickPick(['yes', 'no'], {
				placeHolder: '✅ Are you satisfied with the result?'
			});

			satisfied = confirm === 'yes';
		}

		vscode.window.showInformationMessage("🎉 Task completed successfully!");
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
