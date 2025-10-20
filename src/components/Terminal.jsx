import { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // ASCII Art Banner
  const start = `
                                                                                     
 ██████╗  █████╗ ██████╗ ███████╗    ██╗   ██╗ █████╗ ██╗     ██████╗ ███████╗███████╗
██╔════╝ ██╔══██╗██╔══██╗██╔════╝    ██║   ██║██╔══██╗██║     ██╔══██╗██╔════╝╚══███╔╝
██║  ███╗███████║██████╔╝█████╗      ██║   ██║███████║██║     ██║  ██║█████╗    ███╔╝ 
██║   ██║██╔══██║██╔══██╗██╔══╝      ╚██╗ ██╔╝██╔══██║██║     ██║  ██║██╔══╝   ███╔╝  
╚██████╔╝██║  ██║██████╔╝███████╗     ╚████╔╝ ██║  ██║███████╗██████╔╝███████╗███████╗
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝      ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚══════╝
                                                                                                                                                                                                                                                                                                                                      

Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.
`;

  // Initialize terminal with welcome message
  useEffect(() => {
    setHistory([
      { type: 'output', content: start }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = {
    help: () => ({
      type: 'output',
      content: `
Available commands:

  help          Show this help message
  about         Learn more about me
  projects      View my projects
  skills        See my technical skills
  contact       Get my contact information
  social        View my social media links
  clear         Clear the terminal
  start         Display the welcome banner

  `
    }),

    about: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║            ABOUT ME                   ║
╚═══════════════════════════════════════╝

Hi, my name is Gabe Valdez. Im a Computer Science major with a minor in Business Information Systems, focused on cybersecurity at Oregon State University.

I have a strong foundation in networking, system administration, and problem-solving. Im currently seeking internship opportunities in cybersecurity, IT, or data analysis where I can apply my skills and grow as a professional.

"If it's flipping hamburgers at McDonald's, be the best hamburger flipper in the world. Whatever it is you do you have to master your craft." - Snoop Dogg 
`
    }),

    projects: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║            PROJECTS                   ║
╚═══════════════════════════════════════╝

Game Server Automation
Description
Tech: AWS EC2, Docker, Terraform

BrainBurst
Description
Tech: React, JavaScript, Tailwind CSS, Supabas

Terminal Portfolio
An interactive terminal-style portfolio
Tech: React, Javascript
`
    }),

    skills: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║        TECHNICAL SKILLS               ║
╚═══════════════════════════════════════╝

Certifications - CompTIA A+, CompTIA Network+, CompTIA Security+
Languages - Python, C, C++, SQL, PHP, Javascript, Node.js, CSS, HTML, Prolog, Haskell 
Frameworks - React, Express
Tools - AWS, Docker, Git, CUDA, Ansible, Terraform, Bash, Powershell
`
    }),

    contact: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║          CONTACT INFO                 ║
╚═══════════════════════════════════════╝

Email:    valdez.gabe@hotmail.com

Feel free to reach out for opportunities or collaborations!
`
    }),

    social: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║         SOCIAL LINKS                  ║
╚═══════════════════════════════════════╝

LinkedIn: https://www.linkedin.com/in/gabemvaldez/
GitHub:   https://github.com/ValdezGabe
`
    }),

    clear: () => {
      setHistory([]);
      return null;
    },

    start: () => ({
      type: 'output',
      content: start
    })
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Execute command
    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result) {
        setHistory(prev => [...prev, result]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`
      }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    // Handle up arrow - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    }

    // Handle down arrow - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">gabe-valdez@portfolio:~</div>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            <pre>{item.content}</pre>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
