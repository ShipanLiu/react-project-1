import React, { useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Counter from './components/Counter.tsx'
import TodoList from './components/TodoList.tsx'
import UserCard from './components/UserCard.tsx'

type Section = 'welcome' | 'counter' | 'todos' | 'profile'

function App(): React.ReactElement {
  const [currentSection, setCurrentSection] = useState<Section>('welcome')

  const renderSection = (): React.ReactElement => {
    switch(currentSection) {
      case 'counter':
        return <Counter />
      case 'todos':
        return <TodoList />
      case 'profile':
        return <UserCard />
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome to React! 🎉</h2>
            <p>This app demonstrates key React concepts:</p>
            <ul className="concept-list">
              <li><strong>Components:</strong> Reusable pieces of UI</li>
              <li><strong>State:</strong> Data that can change over time</li>
              <li><strong>Props:</strong> Data passed between components</li>
              <li><strong>Events:</strong> Handling user interactions</li>
            </ul>
            <p>Click the navigation buttons above to explore different examples!</p>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="navigation">
        <button 
          onClick={() => setCurrentSection('welcome')}
          className={currentSection === 'welcome' ? 'active' : ''}
        >
          Welcome
        </button>
        <button 
          onClick={() => setCurrentSection('counter')}
          className={currentSection === 'counter' ? 'active' : ''}
        >
          Counter Example
        </button>
        <button 
          onClick={() => setCurrentSection('todos')}
          className={currentSection === 'todos' ? 'active' : ''}
        >
          Todo List
        </button>
        <button 
          onClick={() => setCurrentSection('profile')}
          className={currentSection === 'profile' ? 'active' : ''}
        >
          User Profile
        </button>
      </nav>
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  )
}

export default App
