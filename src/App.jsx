import { useState, useCallback, useRef, useEffect } from 'react'
import Split from 'react-split'
import Editor from './components/Editor'
import TestCases from './components/TestCases'
import Output from './components/Output'
import Toolbar from './components/Toolbar'
import Runner from './components/Runner'
import './App.css'

const DEFAULT_CODE = `function solution(a, b) {
    // Write your code here
    // Use | separator for multiple arguments: 5 | 10
    
    console.log("Input a:", a);
    console.log("Input b:", b);
    
    // Return anything you want, or nothing at all!
    return a + b;
}`

const DEFAULT_TEST_CASES = `5 | 10
[1, 2, 3] | [4, 5, 6]
"Hello" | " World"`

function App() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [testCases, setTestCases] = useState(DEFAULT_TEST_CASES)
  const [outputs, setOutputs] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('js-playground-theme')
    return saved || 'dark'
  })
  const runnerRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('js-playground-theme', theme)
  }, [theme])

  const handleToggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const handleRun = useCallback(() => {
    if (isRunning) return
    
    setIsRunning(true)
    setOutputs([])
    
    const cases = testCases
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
    
    if (cases.length === 0) {
      setOutputs([{
        testCase: 1,
        input: 'N/A',
        error: 'No test cases provided',
        logs: []
      }])
      setIsRunning(false)
      return
    }

    runnerRef.current?.runTests(code, cases)
  }, [code, testCases, isRunning])

  const handleResults = useCallback((results) => {
    setOutputs(results)
    setIsRunning(false)
  }, [])

  const handleClearOutput = useCallback(() => {
    setOutputs([])
  }, [])

  const handleResetCode = useCallback(() => {
    setCode(DEFAULT_CODE)
  }, [])

  return (
    <div className="app">
      <Toolbar 
        onRun={handleRun}
        onClear={handleClearOutput}
        onReset={handleResetCode}
        isRunning={isRunning}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <Split
        className="split-vertical"
        direction="vertical"
        sizes={[60, 40]}
        minSize={100}
        gutterSize={6}
      >
        <div className="editor-section">
          <Editor code={code} onChange={setCode} theme={theme} />
        </div>
        <Split
          className="split-horizontal"
          sizes={[40, 60]}
          minSize={200}
          gutterSize={6}
        >
          <div className="panel test-cases-panel">
            <div className="panel-header">Test Cases</div>
            <TestCases value={testCases} onChange={setTestCases} />
          </div>
          <div className="panel output-panel">
            <div className="panel-header">Output / Console</div>
            <Output outputs={outputs} isRunning={isRunning} />
          </div>
        </Split>
      </Split>
      <Runner ref={runnerRef} onResults={handleResults} />
    </div>
  )
}

export default App
