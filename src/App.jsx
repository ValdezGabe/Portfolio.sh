import Terminal from './components/Terminal'
import Portfolio from './components/Portfolio'
import AiChat from './components/AiChat'
import './App.css'

function App() {
  return (
    <div className="app">
      <section className="terminal-section">
        <Terminal />
      </section>
      <section className="portfolio-section-wrapper">
        <Portfolio />
      </section>
      <AiChat />
    </div>
  )
}

export default App
