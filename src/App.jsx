import Terminal from './components/Terminal'
import Portfolio from './components/Portfolio'
import AiChat from './components/AiChat'
import './App.css'

// Deterministic PRNG so the code-rain is stable across renders.
const makeRand = (seed) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

// Sparse vertical "code rain" columns — minimalist hacker backdrop.
const buildRain = () => {
  const rand = makeRand(8675309)
  return Array.from({ length: 16 }, () => {
    const len = 14 + Math.floor(rand() * 20)
    const chars = Array.from({ length: len }, () => (rand() > 0.5 ? '1' : '0')).join('\n')
    return {
      left: rand() * 100,
      dur: 9 + rand() * 12,
      delay: -rand() * 18,
      size: 11 + rand() * 4,
      chars,
    }
  })
}

const rain = buildRain()

function App() {
  return (
    <div className="app">
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-rain">
          {rain.map((c, i) => (
            <pre
              key={i}
              className="rain-col"
              style={{
                left: `${c.left}%`,
                fontSize: `${c.size}px`,
                animationDuration: `${c.dur}s`,
                animationDelay: `${c.delay}s`,
              }}
            >
              {c.chars}
            </pre>
          ))}
        </div>
        <div className="bg-scan" />
      </div>

      <section className="terminal-section">
        <Terminal />
      </section>
      <section className="portfolio-section-wrapper">
        <Portfolio />
      </section>
      {/* <AiChat />*/}
    </div>
  )
}

export default App
