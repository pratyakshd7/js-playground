import { useEffect, useRef } from 'react'
import './Output.css'

function Output({ outputs, isRunning }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [outputs])

  const formatValue = (value) => {
    if (value === undefined) return 'undefined'
    if (value === null) return 'null'
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2)
      } catch {
        return String(value)
      }
    }
    return String(value)
  }

  const getLogClass = (type) => {
    switch (type) {
      case 'error': return 'log-error'
      case 'warn': return 'log-warn'
      default: return 'log-info'
    }
  }

  return (
    <div className="output-container" ref={containerRef}>
      {isRunning && (
        <div className="output-running">
          <div className="spinner"></div>
          Running tests...
        </div>
      )}
      
      {!isRunning && outputs.length === 0 && (
        <div className="output-empty">
          Click "Run" to execute your code
        </div>
      )}

      {outputs.map((result, index) => (
        <div key={index} className="test-result">
          <div className="test-header">
            <span className={`test-badge ${result.error ? 'error' : 'success'}`}>
              Test Case {result.testCase}
            </span>
          </div>
          
          <div className="test-section">
            <span className="label">Input:</span>
            <span className="value">{result.input}</span>
          </div>

          {result.error ? (
            <div className="test-section error-section">
              <span className="label">Error:</span>
              <pre className="error-message">{result.error}</pre>
            </div>
          ) : (
            <div className="test-section">
              <span className="label">Output:</span>
              <pre className="output-value">{formatValue(result.output)}</pre>
            </div>
          )}

          {result.logs && result.logs.length > 0 && (
            <div className="test-section console-section">
              <span className="label">Console:</span>
              <div className="console-logs">
                {result.logs.map((log, logIndex) => (
                  <div key={logIndex} className={`console-log ${getLogClass(log.type)}`}>
                    {log.args.map(formatValue).join(' ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Output
