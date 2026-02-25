# ⚡ JS Playground - by Pratyaksh

A browser-based JavaScript coding playground similar to LeetCode, built with React and Monaco Editor.

![JS Playground](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-Latest-green)

## 🚀 Features

- **Monaco Editor** - Full-featured JavaScript editor with syntax highlighting, IntelliSense, and line numbers
- **Multiple Test Cases** - Run your solution against multiple inputs at once
- **Console Capture** - Captures `console.log`, `console.error`, and `console.warn` outputs
- **Safe Execution** - Uses sandboxed iframe for secure code execution
- **Dark Theme** - Beautiful VSCode-style dark theme
- **Resizable Panels** - Adjust panel sizes by dragging the dividers
- **Error Handling** - Displays runtime errors with stack traces

## 📦 Tech Stack

- **React 19** - Functional components with hooks
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - The same editor that powers VS Code
- **react-split** - Resizable split panels

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd js-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📖 Usage

### 1. Write Your Solution

The editor comes with a default template:

```javascript
function solution(input) {
    // Write your code here
    console.log("Processing input:", input);
    return input * 2;
}
```

### 2. Add Test Cases

Enter test cases in the left panel, one per line:

```
5
10
20
[1, 2, 3]
"hello"
```

Each line is parsed and passed as an argument to `solution()`.

### 3. Run & View Results

Click the **Run** button to execute your code. Results show:

- **Input** - The test case value
- **Output** - Return value from your function (green)
- **Console** - Any console.log/warn/error outputs
- **Errors** - Runtime errors with stack traces (red)

## 🎨 UI Features

| Feature | Description |
|---------|-------------|
| ▶️ Run | Execute all test cases |
| 🗑️ Clear | Clear the output panel |
| ↺ Reset | Reset code to default template |

## 🔒 Security

Code execution happens in a sandboxed iframe with `sandbox="allow-scripts"` attribute, preventing:

- Access to parent window
- Cookie/localStorage access
- Form submissions
- Navigation changes

Communication between the main app and iframe uses `postMessage` API.

## 📁 Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main app component
├── App.css               # App styles
├── index.css             # Global styles & theme
└── components/
    ├── Editor.jsx        # Monaco Editor wrapper
    ├── TestCases.jsx     # Test case input panel
    ├── Output.jsx        # Results display panel
    ├── Toolbar.jsx       # Top toolbar with buttons
    └── Runner.jsx        # Sandboxed code executor
```

## 🎯 Supported Input Types

The playground automatically parses test case inputs:

| Input | Parsed As |
|-------|-----------|
| `5` | Number |
| `3.14` | Number |
| `true` / `false` | Boolean |
| `null` | null |
| `[1, 2, 3]` | Array |
| `{"key": "value"}` | Object |
| `hello` | String |
| `"hello"` | String |

## 📝 Example Problems

### Problem 1: Double the Number

```javascript
function solution(input) {
    return input * 2;
}
```
Test cases: `5`, `10`, `20`

### Problem 2: Sum of Array

```javascript
function solution(input) {
    return input.reduce((a, b) => a + b, 0);
}
```
Test cases: `[1, 2, 3]`, `[10, 20, 30]`

### Problem 3: Reverse String

```javascript
function solution(input) {
    return input.split('').reverse().join('');
}
```
Test cases: `"hello"`, `"world"`

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

---

Made with ❤️ by **Pratyaksh**
