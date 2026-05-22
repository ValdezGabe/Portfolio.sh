import { useState, useEffect, useRef } from 'react';
import {
  personalInfo,
  about,
  education,
  experience,
  coreSkills,
  additionalSkills,
  certGraph,
  projects,
  seeking
} from '../data/portfolioData';
import './Terminal.css';

// ── Terminal content is derived from portfolioData so it never drifts ──
const BOX_W = 43;

const box = (title) => {
  const inner = BOX_W - 2;
  const t = title.toUpperCase();
  const left = Math.floor((inner - t.length) / 2);
  const right = inner - t.length - left;
  return `╔${'═'.repeat(inner)}╗\n║${' '.repeat(left)}${t}${' '.repeat(right)}║\n╚${'═'.repeat(inner)}╝`;
};

const certsByStatus = (status) =>
  certGraph.nodes.filter(n => n.status === status).map(n => n.name);

const aboutText = `
${box('About Me')}

${about}

${personalInfo.quote}
`;

const educationText = `
${box('Education')}

${education.school}
${education.degree} | ${education.minor}
Focus: ${education.focus}
Expected Graduation: ${education.graduation}
GPA: ${education.gpa}

Relevant Coursework:
${education.coursework.map(c => `  • ${c}`).join('\n')}

Certifications:
${certsByStatus('completed').map(c => `  • ${c}`).join('\n')}
${certsByStatus('in-progress').map(c => `  • ${c} (In Progress)`).join('\n')}
`;

const experienceText = `
${box('Work Experience')}
${experience.map(job => `
${job.title}${job.upcoming ? '  [Incoming]' : ''}
${job.company}
${job.location} | ${job.period}
${job.bullets.map(b => `  • ${b}`).join('\n')}`).join('\n')}
`;

const projectsText = `
${box('Projects')}
${projects.map(p => `
${p.title}${p.hackathon ? ` [${p.hackathon}]` : ''}
${p.description}
Tech: ${p.tech.join(', ')}`).join('\n')}
`;

const skillsText = `
${box('Technical Skills')}

Core (years of experience):
${coreSkills.map(s => `  ${s.name.padEnd(12)} ${s.years} ${s.years === 1 ? 'yr' : 'yrs'}`).join('\n')}

${Object.entries(additionalSkills).map(([cat, items]) => `${cat}:\n  ${items.join(', ')}`).join('\n\n')}
`;

const contactText = `
${box('Contact Info')}

Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}

Feel free to reach out for opportunities or collaborations!
`;

const socialText = `
${box('Social Links')}

LinkedIn: ${personalInfo.linkedin}
GitHub:   ${personalInfo.github}
`;

const seekingText = `
${box('Looking For')}

Targeting roles in:
${seeking.map(s => `  • ${s}`).join('\n')}
`;

const allText = [
  aboutText, educationText, experienceText,
  projectsText, skillsText, seekingText, contactText, socialText
].join('\n');

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

  // ASCII Art Banner - Mobile (initials only, fits better)
  const asciiTitleMobile = `
 ██████╗ ██╗   ██╗
██╔════╝ ██║   ██║
██║  ███╗██║   ██║
██║   ██║╚██╗ ██╔╝
╚██████╔╝ ╚████╔╝
 ╚═════╝   ╚═══╝
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
  seeking       Roles I'm targeting
  contact       Get my contact information
  social        View my social media links
  resume        Download my resume
  msg           Send me a message
  clear         Clear the terminal
  exit          Close the terminal

Tip: Use Tab for autocomplete, ↑↓ arrows for command history

  `
    }),

    all:        () => ({ type: 'output', content: allText }),
    about:      () => ({ type: 'output', content: aboutText }),
    education:  () => ({ type: 'output', content: educationText }),
    experience: () => ({ type: 'output', content: experienceText }),
    projects:   () => ({ type: 'output', content: projectsText }),
    skills:     () => ({ type: 'output', content: skillsText }),
    seeking:    () => ({ type: 'output', content: seekingText }),
    contact:    () => ({ type: 'output', content: contactText }),
    social:     () => ({ type: 'output', content: socialText }),

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
            ) : (
              <pre>{item.content}</pre>
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
