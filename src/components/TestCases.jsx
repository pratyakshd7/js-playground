import './TestCases.css'

function TestCases({ value, onChange }) {
  return (
    <div className="test-cases-container">
      <textarea
        className="test-cases-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter test cases (one per line)&#10;&#10;Single argument:&#10;5&#10;[1, 2, 3]&#10;&#10;Multiple arguments (use | separator):&#10;[1,2,3] | 2&#10;'hello' | 'world'&#10;[1,2] | [3,4] | 5"
        spellCheck={false}
      />
      <div className="test-cases-hint">
        One test case per line. Use <code>|</code> to separate multiple arguments.
      </div>
    </div>
  )
}

export default TestCases
