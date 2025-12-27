import { useState, useEffect, useRef } from 'react';
import './Terminal.css';

// Typing animation component
const TypingText = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const isTyping = currentIndex < text.length;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <pre>{displayedText}{isTyping && <span className="typing-cursor">{showCursor ? '_' : '\u00A0'}</span>}</pre>
  );
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // ASCII Art Banner - Desktop (full name)
  const asciiTitleDesktop = `
 ██████╗  █████╗ ██████╗ ███████╗    ██╗   ██╗ █████╗ ██╗     ██████╗ ███████╗███████╗
██╔════╝ ██╔══██╗██╔══██╗██╔════╝    ██║   ██║██╔══██╗██║     ██╔══██╗██╔════╝╚══███╔╝
██║  ███╗███████║██████╔╝█████╗      ██║   ██║███████║██║     ██║  ██║█████╗    ███╔╝
██║   ██║██╔══██║██╔══██╗██╔══╝      ╚██╗ ██╔╝██╔══██║██║     ██║  ██║██╔══╝   ███╔╝
╚██████╔╝██║  ██║██████╔╝███████╗     ╚████╔╝ ██║  ██║███████╗██████╔╝███████╗███████╗
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝      ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚══════╝
`;

  // ASCII Art Banner - Mobile (first name only, fits better)
  const asciiTitleMobile = `
 ██████╗  █████╗ ██████╗ ███████╗
██╔════╝ ██╔══██╗██╔══██╗██╔════╝
██║  ███╗███████║██████╔╝█████╗
██║   ██║██╔══██║██╔══██╗██╔══╝
╚██████╔╝██║  ██║██████╔╝███████╗
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝
`;

  // Welcome text (will be typed out)
  const welcomeText = `Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.`;

  // Initialize terminal with welcome message
  useEffect(() => {
    setHistory([
      { type: 'banner', contentDesktop: asciiTitleDesktop, contentMobile: asciiTitleMobile, welcomeText: welcomeText }
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
  all           View full portfolio
  about         Learn more about me
  education     View my education background
  experience    See my work experience
  projects      View my projects
  skills        See my technical skills
  contact       Get my contact information
  social        View my social media links
  resume        Download my resume
  msg           Send me a message
  clear         Clear the terminal
  exit          Close the terminal

Tip: Use Tab for autocomplete, ↑↓ arrows for command history

  `
    }),

    all: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║            ABOUT ME                   ║
╚═══════════════════════════════════════╝

Hi, my name is Gabe Valdez. Im a Computer Science major with a minor in Business Information Systems, focused on cybersecurity at Oregon State University.

I have a strong foundation in networking, system administration, and problem-solving. Im currently seeking internship opportunities in cybersecurity, IT, or data analysis where I can apply my skills and grow as a professional.

"If it's flipping hamburgers at McDonald's, be the best hamburger flipper in the world. Whatever it is you do you have to master your craft." - Snoop Dogg

╔═══════════════════════════════════════╗
║             EDUCATION                 ║
╚═══════════════════════════════════════╝

Oregon State University
B.S. Computer Science | Minor in Business Information Systems
Focus: Cybersecurity
Expected Graduation: June 2027
GPA: 3.42

Relevant Coursework:
• Network Security & Administration
• System Administration
• Data Structures & Algorithms
• Database Management
• Software Engineering

Certifications:
• CompTIA A+
• CompTIA Network+ (In Progress)
• CompTIA Security+ (In Progress)

╔═══════════════════════════════════════╗
║           WORK EXPERIENCE             ║
╚═══════════════════════════════════════╝

Looking for opportunities!
Currently seeking internship positions in:
• Cybersecurity
• IT/System Administration
• Data Analysis
• Software Development

Skills I bring:
• Network security & administration
• System troubleshooting & support
• Python, C/C++, SQL programming
• Cloud infrastructure (AWS)
• DevOps tools (Docker, Terraform)

╔═══════════════════════════════════════╗
║            PROJECTS                   ║
╚═══════════════════════════════════════╝

DubBetter Ring
An intelligent doorbell and security camera system built for DubHacks 2025 that combines real-time video streaming with AI-powered object detection. The platform streams live 1080p HD video from a Raspberry Pi camera to a web dashboard, where users can monitor their front door with automatic motion detection and person recognition. Using TensorFlow for on-device inference and WebSocket connections for low-latency streaming, the system provides instant event notifications, activity timelines, and a YouTube-style interface for reviewing security events.
Tech: React, TensorFlow, OpenCV, Raspberry Pi, Socket.io, TailwindCSS

Game Server Automation
Designed and implemented a fully automated infrastructure-as-code solution for deploying a containerized Minecraft server on AWS. Built using Terraform for infrastructure provisioning and Docker for containerization, the system automatically configures complete AWS networking architecture including VPC, security groups, and EC2 instances.
Tech: AWS EC2, Docker, Terraform

BrainBurst
Built a full-stack flashcard learning platform featuring end-to-end encryption and JWT authentication to protect user study data. Engineered interactive study modes with spaced repetition algorithms and responsive design.
Tech: React, JavaScript, Tailwind CSS, Supabase

Terminal Portfolio
An interactive terminal-style portfolio
Tech: React, Javascript

╔═══════════════════════════════════════╗
║        TECHNICAL SKILLS               ║
╚═══════════════════════════════════════╝

Certifications - CompTIA A+, CompTIA Network+, CompTIA Security+
Languages - Python, C, C++, SQL, PHP, Javascript, Node.js, CSS, HTML, Prolog, Haskell
Frameworks - React, Express, Tensorflow, Tensorflow lite
Tools - AWS, Docker, NumPy, OpenCV, Git, CUDA, Ansible, Terraform, Bash, Powershell

╔═══════════════════════════════════════╗
║          CONTACT INFO                 ║
╚═══════════════════════════════════════╝

Email:    gabemakanavaldez@gmail.com
Phone:    (808)446-6022

╔═══════════════════════════════════════╗
║         SOCIAL LINKS                  ║
╚═══════════════════════════════════════╝

LinkedIn: https://www.linkedin.com/in/gabemvaldez/
GitHub:   https://github.com/ValdezGabe

Feel free to reach out for opportunities or collaborations!
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

    education: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║             EDUCATION                 ║
╚═══════════════════════════════════════╝

Oregon State University
B.S. Computer Science | Minor in Business Information Systems
Focus: Cybersecurity
Expected Graduation: June 2027
GPA: 3.42

Relevant Coursework:
• Network Security & Administration
• System Administration
• Data Structures & Algorithms
• Database Management
• Software Engineering

Certifications:
• CompTIA A+
• CompTIA Network+ (In Progress)
• CompTIA Security+ (In Progress)
`
    }),

    experience: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║           WORK EXPERIENCE             ║
╚═══════════════════════════════════════╝

Looking for opportunities!
Currently seeking internship positions in:
• Cybersecurity
• IT/System Administration
• Data Analysis
• Software Development

Skills I bring:
• Network security & administration
• System troubleshooting & support
• Python, C/C++, SQL programming
• Cloud infrastructure (AWS)
• DevOps tools (Docker, Terraform)
`
    }),
    projects: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║            PROJECTS                   ║
╚═══════════════════════════════════════╝

DubBetter Ring
An intelligent doorbell and security camera system built for DubHacks 2025 that combines real-time video streaming with AI-powered object detection. The platform streams live 1080p HD video from a
Raspberry Pi camera to a web dashboard, where users can monitor their front door with automatic motion detection and person recognition. Using TensorFlow for on-device inference and WebSocket connections for low-latency streaming, the system provides instant event notifications, activity timelines, and a YouTube-style interface for reviewing security events. Built with React, TailwindCSS, and OpenCV, DubBetter Ring delivers enterprise-grade home security with an intuitive user experience
Tech: React, TensorFlow, OpenCV, Raspberry Pi, Socket.io, TailwindCSS

Game Server Automation
Designed and implemented a fully automated infrastructure-as-code solution for deploying a containerized Minecraft server on AWS. Built using Terraform for infrastructure provisioning and Docker for containerization, the system automatically configures complete AWS networking
architecture including VPC, security groups, and EC2 instances. Developed Bash automation scripts enabling single-command deployment and teardown workflows, significantly reducing operational overhead. Implemented production-ready features including persistent storage for game data, proper port routing for player connectivity, and encrypted SSH access for secure server administration.
Tech: AWS EC2, Docker, Terraform

BrainBurst
Built a full-stack flashcard learning platform featuring end-to-end encryption and JWT authentication to protect user study data. Engineered interactive study modes with spaced repetition algorithms and responsive design, increasing active learning engagement and reducing passive screen time by 40% across web and mobile interfaces
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
Frameworks - React, Express, Tensorflow, Tensorflow lite
Tools - AWS, Docker, NumPy, OpenCV, Git, CUDA, Ansible, Terraform, Bash, Powershell

`
    }),

    contact: () => ({
      type: 'output',
      content: `
╔═══════════════════════════════════════╗
║          CONTACT INFO                 ║
╚═══════════════════════════════════════╝

Email:    gabemakanavaldez@gmail.com
Phone:    (808)446-6022

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

    resume: () => {
      // Trigger resume download
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Gabe_Valdez_Resume.pdf';
      link.click();
      return {
        type: 'output',
        content: 'Downloading resume...\nIf download doesn\'t start, the resume file may not be available yet.'
      };
    },

    msg: () => {
      setFormMode('name');
      setFormData({});
      return {
        type: 'output',
        content: 'Let\'s get in touch! I\'ll need a few details.\n\nWhat\'s your name?'
      };
    },

    exit: () => {
      setIsClosing(true);
      setTimeout(() => setIsClosed(true), 500);
      return {
        type: 'output',
        content: 'Goodbye! Thanks for visiting.'
      };
    },

    // Command aliases
    '?': function() { return this.help(); },
    info: function() { return this.about(); },
    cls: function() { return this.clear(); }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: formMode ? `> ${cmd}` : `$ ${cmd}` }]);

    if (!trimmedCmd) return;

    // Add to command history (only for non-form inputs)
    if (!formMode) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    // Handle form mode
    if (formMode) {
      const newFormData = { ...formData };

      if (formMode === 'name') {
        newFormData.name = trimmedCmd;
        setFormData(newFormData);
        setFormMode('email');
        setHistory(prev => [...prev, {
          type: 'output',
          content: `Nice to meet you, ${trimmedCmd}!\n\nWhat's your email address?`
        }]);
        return;
      }

      if (formMode === 'email') {
        // Basic email validation
        if (!trimmedCmd.includes('@')) {
          setHistory(prev => [...prev, {
            type: 'error',
            content: 'Please enter a valid email address:'
          }]);
          return;
        }
        newFormData.email = trimmedCmd;
        setFormData(newFormData);
        setFormMode('message');
        setHistory(prev => [...prev, {
          type: 'output',
          content: 'Great! Now, what\'s your message?'
        }]);
        return;
      }

      if (formMode === 'message') {
        newFormData.message = trimmedCmd;
        setFormData(newFormData);
        setFormMode(null);

        // Submit to Netlify
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            ...newFormData
          }).toString()
        })
          .then(() => {
            setHistory(prev => [...prev, {
              type: 'output',
              content: `✓ Message sent successfully!\n\nThanks ${newFormData.name}, I'll get back to you at ${newFormData.email} soon!`
            }]);
          })
          .catch(() => {
            setHistory(prev => [...prev, {
              type: 'error',
              content: 'Failed to send message. Please try emailing me directly at valdez.gabe@hotmail.com'
            }]);
          });
        return;
      }
    }

    const lowerCmd = trimmedCmd.toLowerCase();

    // Execute command
    if (commands[lowerCmd]) {
      const result = commands[lowerCmd]();
      if (result) {
        setHistory(prev => [...prev, result]);
      }
    } else {
      // Command not found - suggest similar commands
      const suggestions = findSimilarCommands(lowerCmd);
      let errorMessage = `Command not found: ${lowerCmd}`;

      if (suggestions.length > 0) {
        errorMessage += `\n\nDid you mean: ${suggestions.join(', ')}?`;
      }

      errorMessage += `\n\nType 'help' for available commands.`;

      setHistory(prev => [...prev, {
        type: 'error',
        content: errorMessage
      }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  // Get all available command names (including aliases)
  const getAllCommandNames = () => {
    return Object.keys(commands);
  };

  // Find command suggestions based on similarity
  const findSimilarCommands = (cmd) => {
    const allCommands = getAllCommandNames();
    return allCommands.filter(command => {
      // Simple similarity check - starts with same letter or contains substring
      return command.startsWith(cmd.charAt(0)) || command.includes(cmd) || cmd.includes(command);
    }).slice(0, 3);
  };

  const handleKeyDown = (e) => {
    // Handle Tab - autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedInput = input.trim().toLowerCase();
      if (trimmedInput) {
        const matchingCommands = getAllCommandNames().filter(cmd =>
          cmd.startsWith(trimmedInput)
        );
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Show all matching commands
          setHistory(prev => [...prev, {
            type: 'output',
            content: matchingCommands.join('  ')
          }]);
        }
      }
    }

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

  if (isClosed) {
    return (
      <div className="terminal-closed">
        <p>Thanks for visiting! 👋<br/>Refresh the page to restart.</p>
      </div>
    );
  }

  return (
    <div className={`terminal-container ${isClosing ? 'closing' : ''}`} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close" onClick={() => { setIsClosing(true); setTimeout(() => setIsClosed(true), 500); }}></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">gabe-valdez@portfolio:~</div>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'banner' ? (
              <div className="banner-section">
                <pre className="ascii-desktop">{item.contentDesktop}</pre>
                <pre className="ascii-mobile">{item.contentMobile}</pre>
                <TypingText text={item.welcomeText} speed={20} />
              </div>
            ) : item.type === 'input' || item.type === 'error' || index < history.length - 1 ? (
              <pre>{item.content}</pre>
            ) : (
              <TypingText text={item.content} speed={5} />
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">{formMode ? '>' : '$'}</span>
          <div className="input-wrapper">
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
            <span className="input-display">
              {input}<span className="blink-cursor">_</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
