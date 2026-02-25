import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import './Runner.css'

const Runner = forwardRef(function Runner({ onResults }, ref) {
  const iframeRef = useRef(null)
  const pendingTestsRef = useRef(null)
  const resultsRef = useRef([])

  const generateIframeContent = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
<script>
  const consoleLogs = [];
  
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
  };

  console.log = function(...args) {
    consoleLogs.push({ type: 'log', args: args.map(serializeArg) });
  };
  
  console.error = function(...args) {
    consoleLogs.push({ type: 'error', args: args.map(serializeArg) });
  };
  
  console.warn = function(...args) {
    consoleLogs.push({ type: 'warn', args: args.map(serializeArg) });
  };
  
  console.info = function(...args) {
    consoleLogs.push({ type: 'log', args: args.map(serializeArg) });
  };

  function serializeArg(arg) {
    if (arg === undefined) return 'undefined';
    if (arg === null) return 'null';
    if (typeof arg === 'function') return arg.toString();
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg);
      } catch (e) {
        return String(arg);
      }
    }
    return String(arg);
  }

  function parseInput(input) {
    const trimmed = input.trim();
    try {
      return JSON.parse(trimmed);
    } catch {
      if (trimmed === 'true') return true;
      if (trimmed === 'false') return false;
      if (trimmed === 'null') return null;
      if (trimmed === 'undefined') return undefined;
      if (!isNaN(trimmed) && trimmed !== '') return Number(trimmed);
      return trimmed;
    }
  }

  function parseMultipleInputs(inputLine) {
    // Split by | delimiter for multiple arguments
    const parts = inputLine.split('|').map(p => p.trim());
    return parts.map(parseInput);
  }

  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'RUN_TEST') {
      const { code, input, testCase } = event.data;
      consoleLogs.length = 0;
      
      try {
        const fn = new Function(code + '\\nreturn solution;')();
        const parsedInputs = parseMultipleInputs(input);
        const result = fn(...parsedInputs);
        
        parent.postMessage({
          type: 'TEST_RESULT',
          testCase: testCase,
          input: input,
          output: serializeArg(result),
          logs: [...consoleLogs],
          error: null
        }, '*');
      } catch (err) {
        parent.postMessage({
          type: 'TEST_RESULT',
          testCase: testCase,
          input: input,
          output: null,
          logs: [...consoleLogs],
          error: err.toString() + (err.stack ? '\\n' + err.stack : '')
        }, '*');
      }
    }
  });
  
  parent.postMessage({ type: 'IFRAME_READY' }, '*');
</script>
</body>
</html>
    `
  }

  const handleMessage = useCallback((event) => {
    const data = event.data
    
    if (data.type === 'IFRAME_READY' && pendingTestsRef.current) {
      const { code, testCases } = pendingTestsRef.current
      runNextTest(code, testCases, 0)
    }
    
    if (data.type === 'TEST_RESULT') {
      let parsedOutput = data.output
      if (data.output !== null && data.output !== undefined) {
        try {
          parsedOutput = JSON.parse(data.output)
        } catch {
          // If it's not valid JSON, use the raw string value
          parsedOutput = data.output
        }
      }
      
      const result = {
        testCase: data.testCase,
        input: data.input,
        output: parsedOutput,
        logs: data.logs,
        error: data.error
      }
      
      resultsRef.current.push(result)
      
      if (pendingTestsRef.current) {
        const { code, testCases } = pendingTestsRef.current
        const nextIndex = data.testCase
        
        if (nextIndex < testCases.length) {
          runNextTest(code, testCases, nextIndex)
        } else {
          onResults([...resultsRef.current])
          pendingTestsRef.current = null
        }
      }
    }
  }, [onResults])

  const runNextTest = (code, testCases, index) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'RUN_TEST',
        code: code,
        input: testCases[index],
        testCase: index + 1
      }, '*')
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  useImperativeHandle(ref, () => ({
    runTests: (code, testCases) => {
      resultsRef.current = []
      pendingTestsRef.current = { code, testCases }
      
      if (iframeRef.current) {
        const blob = new Blob([generateIframeContent()], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url
      }
    }
  }))

  return (
    <iframe
      ref={iframeRef}
      className="runner-iframe"
      sandbox="allow-scripts"
      title="Code Runner"
    />
  )
})

export default Runner
