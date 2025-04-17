# 🧠 AI Code Runner

[![VS Code](https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visualstudiocode)](https://code.visualstudio.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Required-green?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A Visual Studio Code extension to **generate, refine, and run JavaScript, C, or C++ code** using AI (powered by OpenRouter API).

---

## 🚀 Features

- 💬 Describe what you want the AI to build
- ⚙️ Choose your preferred programming language: JavaScript, C, or C++
- 🤖 AI generates the code automatically
- 🛠️ Give feedback to refine the code iteratively
- ▶️ Instantly run the generated code in the terminal

---

## 🧰 Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- An **OpenRouter API Key** for accessing AI generation
- VS Code (v1.99.0 or newer)

---

## 🛠️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-code-runner.git
cd ai-code-runner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Open in VS Code and launch extension

- Press `F5` in VS Code to open a new Extension Development Host.
- Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:  
  **AI Code Runner: Generate Code**

---

## 🔑 Configure API Key

Replace the placeholder key in `extension.js`:

```js
'Authorization': 'Bearer YOUR_API_KEY_HERE'
```

You can obtain a free API key from [OpenRouter.ai](https://openrouter.ai/).

---

## 🧪 Supported Languages

- ✅ JavaScript (Node.js)
- ✅ C (via GCC)
- ✅ C++ (via g++)

Make sure you have compilers like `gcc` and `g++` installed on your system to run C/C++ code.

---

## 📸 Screenshots

> Coming soon — GIF showing code generation, refinement, and execution!

---

## 📄 License

MIT © [Your Name](https://github.com/your-username)

---

## 🙌 Acknowledgements

- [OpenRouter.ai](https://openrouter.ai/) — AI Code Generation
- [VS Code Extension API](https://code.visualstudio.com/api)

```

---

Let me know if you'd like me to personalize it with your name or GitHub link — or generate a logo/banner for it too!