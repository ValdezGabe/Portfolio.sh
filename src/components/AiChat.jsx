import { useState, useRef, useEffect } from 'react'
import './AiChat.css'

const WELCOME_MSG = "Hi! I'm Gabe's AI assistant. Ask me anything about his skills, projects, or experience."

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'system', content: WELCOME_MSG }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    // Build conversation history for the API (exclude system welcome)
    const apiMessages = updatedMessages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role === 'ai' ? 'assistant' : m.role, content: m.content }))

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button className="chat-toggle" onClick={() => setOpen(true)} aria-label="Open chat">
        {'> _'}
      </button>
    )
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-header-title">{'>'} GabeAI</span>
        <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
          ✕
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-loading">
            <span></span><span></span><span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={sendMessage}>
        <input
          ref={inputRef}
          className="chat-input"
          type="text"
          placeholder="Ask about Gabe..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="chat-send" type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
