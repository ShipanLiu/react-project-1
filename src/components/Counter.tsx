import React, { useState } from 'react'
import './Counter.css'

function Counter(): React.ReactElement {
  const [count, setCount] = useState<number>(0)

  const increment = (): void => {
    setCount(count + 1)
  }

  const decrement = (): void => {
    setCount(count - 1)
  }

  const reset = (): void => {
    setCount(0)
  }

  return (
    <div className="counter-container">
      <h2>Counter Example</h2>
      <p>This demonstrates React state management with the useState hook.</p>
      
      <div className="counter-display">
        <span className="count-number">{count}</span>
      </div>
      
      <div className="counter-buttons">
        <button onClick={decrement} className="btn btn-danger">
          - Decrease
        </button>
        <button onClick={reset} className="btn btn-secondary">
          Reset
        </button>
        <button onClick={increment} className="btn btn-success">
          + Increase
        </button>
      </div>
      
      <div className="explanation">
        <h3>What's happening here?</h3>
        <ul>
          <li><code>useState(0)</code> creates a state variable starting at 0</li>
          <li>Each button click calls <code>setCount</code> to update the state</li>
          <li>When state changes, React re-renders the component</li>
        </ul>
      </div>
    </div>
  )
}

export default Counter 