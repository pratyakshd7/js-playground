import MonacoEditor from '@monaco-editor/react'
import './Editor.css'

function Editor({ code, onChange, theme }) {
  const handleEditorChange = (value) => {
    onChange(value || '')
  }

  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme('vs-dark-custom', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.selectionBackground': '#264f78',
        'editor.lineHighlightBackground': '#2a2d2e',
      }
    })

    monaco.editor.defineTheme('vs-light-custom', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1e1e1e',
        'editorLineNumber.foreground': '#6e6e6e',
        'editorLineNumber.activeForeground': '#1e1e1e',
        'editor.selectionBackground': '#add6ff',
        'editor.lineHighlightBackground': '#f3f3f3',
      }
    })
  }

  const editorTheme = theme === 'dark' ? 'vs-dark-custom' : 'vs-light-custom'

  return (
    <div className="editor-container">
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={editorTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 10 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          folding: true,
          lineDecorationsWidth: 10,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
        }}
      />
    </div>
  )
}

export default Editor
