import './Toolbar.css'

function Toolbar({ onRun, onClear, onReset, isRunning, theme, onToggleTheme }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-title">
          <span className="toolbar-icon">⚡</span>
          JS Playground - by Pratyaksh
        </div>
      </div>
      <div className="toolbar-right">
        <button 
          className="toolbar-btn btn-secondary btn-theme"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span className="btn-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
        <button 
          className="toolbar-btn btn-secondary"
          onClick={onReset}
          disabled={isRunning}
          title="Reset code to default"
        >
          <span className="btn-icon">↺</span>
          Reset
        </button>
        <button 
          className="toolbar-btn btn-secondary"
          onClick={onClear}
          disabled={isRunning}
          title="Clear output"
        >
          <span className="btn-icon">🗑</span>
          Clear
        </button>
        <button 
          className="toolbar-btn btn-primary"
          onClick={onRun}
          disabled={isRunning}
          title="Run all test cases"
        >
          <span className="btn-icon">{isRunning ? '⏳' : '▶'}</span>
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
    </div>
  )
}

export default Toolbar
