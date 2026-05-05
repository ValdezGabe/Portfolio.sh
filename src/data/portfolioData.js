import awsLogo from '../assets/icons8-aws-logo-48.png';
import powershellLogo from '../assets/Powershell.svg';

export const personalInfo = {
  name: "Gabe Valdez",
  title: "Computer Science Student | Cybersecurity Focus",
  email: "gabemakanavaldez@gmail.com",
  phone: "(808) 446-6022",
  linkedin: "https://www.linkedin.com/in/gabemvaldez/",
  github: "https://github.com/ValdezGabe",
  quote: '"If it\'s flipping hamburgers at McDonald\'s, be the best hamburger flipper in the world. Whatever it is you do you have to master your craft." - Snoop Dogg'
};

export const about = `Hi, my name is Gabe Valdez. I'm a Computer Science major with a minor in Business Information Systems, focused on cybersecurity at Oregon State University.

I work across cybersecurity, DevOps/SecOps, and cloud engineering — building detection logic, automating infrastructure with Terraform/Ansible, and migrating workloads to Azure/AWS. Currently a Cybersecurity Student Analyst at ORTSOC and an incoming InfoSec Intern at Concora Credit.`;

export const education = {
  school: "Oregon State University",
  degree: "B.S. Computer Science",
  minor: "Minor in Business Information Systems",
  focus: "Cybersecurity",
  graduation: "June 2027",
  gpa: "3.45",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Databases",
    "Computer Architecture",
    "Computer Networks",
    "System Administration",
    "Project Management",
    "Parallel Programming",
    "Web Development",
    "Usability Engineering",
    "Database Management",
    "Software Engineering",
    "Network Security",
    "Digital Forensics"
  ]
};

export const experience = [
  {
    title: "Information Security Intern",
    company: "Concora Credit",
    location: "Beaverton, OR",
    period: "Jun 2026 -- Aug 2026",
    upcoming: true,
    bullets: [
      "Analyze hygiene of a multi-thousand-directory environment, surfacing stale permissions and access risks",
      "Optimize and automate manual security workflows to reduce response time and analyst toil",
      "Migrate on-premise systems to Azure cloud, hardening identity, networking, and access controls during cutover"
    ]
  },
  {
    title: "Cybersecurity Student Analyst",
    company: "ORTSOC — The Nation's First Cybersecurity Teaching Hospital™",
    location: "Corvallis, OR",
    period: "Sep 2025 -- Present",
    bullets: [
      "Triage 10,000+ weekly security alerts in Elastic SIEM, authoring KQL detection rules and correlation dashboards that map IOCs to adversary TTPs across the MITRE ATT&CK kill chain",
      "Hunt advanced threats across 1M+ endpoints using Zeek and Suricata, identifying C2 beaconing, DNS tunneling, and lateral movement; tuned detection logic cut false positives by 30%",
      "Execute penetration tests and vulnerability assessments for real-world clients using Metasploit, Nmap, and Burp Suite, scoped to OWASP Top 10 and NIST 800-115 methodologies",
      "Lead incident response cases per NIST 800-61: disk/memory forensics, chain-of-custody documentation, and remediation reports for stakeholders",
      "Conduct GRC gap analyses mapped to NIST CSF 2.0, NIST 800-53, and CIS Controls, producing risk register updates and control recommendations"
    ]
  },
  {
    title: "Undergraduate Learning Assistant — System Administration",
    company: "Oregon State University",
    location: "Corvallis, OR",
    period: "Mar 2026 -- Present",
    bullets: [
      "Guide 150+ students through Terraform-based AWS labs covering EC2, VPC, security groups, NACLs, IAM roles, and CloudFormation, reinforcing IaC and cloud networking fundamentals",
      "Mentor on Ansible playbook design, Linux hardening (CIS Benchmarks), user/group administration, and automated patching across heterogeneous fleets",
      "Support coursework on OS installation, dynamic routing, identity management, Docker containerization, and CI/CD fundamentals across a 10-week curriculum"
    ]
  },
  {
    title: "IT Technician",
    company: "Oregon State University",
    location: "Corvallis, OR",
    period: "Jul 2025 -- Present",
    bullets: [
      "Triage and resolve ServiceNow tickets using PowerShell and Bash automation, reducing manual resolution time by 40% with a 98%+ first-contact resolution rate",
      "Administer 10,000+ Active Directory accounts, group policies, and 3,500+ DNS/DHCP configurations; enforce least-privilege access controls and monitor for unauthorized privilege escalation"
    ]
  }
];

// Primary visual skill cards — icon slugs use simpleicons.org CDN.
export const coreSkills = [
  { name: "Python",     years: 4, icon: "python",             color: "3776AB" },
  { name: "Bash",       years: 4, icon: "gnubash",            color: "4EAA25" },
  { name: "PowerShell", years: 4, icon: "powershell",          color: "5391FE", iconSrc: powershellLogo  },
  { name: "Wireshark",  years: 3, icon: "wireshark",          color: "1679A7" },
  { name: "Linux",      years: 3, icon: "linux",              color: "FCC624" },
  { name: "Git",        years: 3, icon: "git",                color: "F05032" },
  { name: "C",          years: 3, icon: "c",                  color: "A8B9CC" },
  { name: "React",      years: 3, icon: "react",              color: "61DAFB" },
  { name: "AWS",        years: 2, icon: "amazonwebservices",  color: "FF9900", iconSrc: awsLogo },
  { name: "Docker",     years: 2, icon: "docker",             color: "2496ED" },
  { name: "Terraform",  years: 2, icon: "terraform",          color: "7B42BC" },
  { name: "C++",        years: 2, icon: "cplusplus",          color: "00599C" },
  { name: "SQL",        years: 2, icon: "mysql",              color: "4479A1" }
];

export const additionalSkills = {
  "Security & Forensics": [
    "Elastic SIEM / KQL",
    "Zeek",
    "Suricata",
    "Metasploit",
    "Nmap",
    "Burp Suite",
    "ELK Stack",
    "MITRE ATT&CK",
    "NIST 800-61",
    "NIST 800-53",
    "NIST CSF 2.0",
    "CIS Controls",
    "OWASP Top 10"
  ],
  "Cloud & Infrastructure": [
    "Azure",
    "Ansible",
    "CloudFormation",
    "EC2 / VPC / IAM",
    "Active Directory",
    "DNS / DHCP",
    "ServiceNow"
  ],
  "Systems & Networking": [
    "TCP/IP",
    "Kali Linux",
    "Ubuntu",
    "Alma Linux",
    "VMware",
    "VirtualBox",
    "PowerShell"
  ],
  "Other Languages & Libs": [
    "JavaScript",
    "Node.js",
    "HTML",
    "CSS"
  ]
};

// Git-graph layout: 3 branches converge into CISSP.
// col = branch lane (0=Cyber, 1=Cloud, 2=DevOps), row = vertical position.
export const certGraph = {
  branches: [
    { id: 'cyber',  label: 'Cybersecurity',   col: 0 },
    { id: 'cloud',  label: 'Cloud',           col: 1 },
    { id: 'devops', label: 'DevOps / SecOps', col: 2 }
  ],
  nodes: [
    { id: 'aplus',   name: 'CompTIA A+',          status: 'completed',   col: 0, row: 0 },
    { id: 'netplus', name: 'CompTIA Network+',    status: 'in-progress', col: 0, row: 1 },
    { id: 'secplus', name: 'CompTIA Security+',   status: 'in-progress', col: 0, row: 2 },
    { id: 'sc200',   name: 'Microsoft SC-200',    status: 'in-progress',     col: 0, row: 3 },

    { id: 'az900',   name: 'Azure AZ-900',        status: 'completed',   col: 1, row: 0 },
    { id: 'az104',   name: 'Azure AZ-104',        status: 'planned',     col: 1, row: 1 },
    { id: 'az500',   name: 'Azure AZ-500',        status: 'planned',     col: 1, row: 2 },

    { id: 'tf',      name: 'Terraform Associate', status: 'planned',     col: 2, row: 0 },
    { id: 'cka',     name: 'CKA',                 status: 'planned',     col: 2, row: 1 },

    { id: 'cissp',   name: 'CISSP',        status: 'planned',     col: 1, row: 4, capstone: true }
  ],
  edges: [
    { from: 'aplus',   to: 'netplus' },
    { from: 'netplus', to: 'secplus' },
    { from: 'secplus', to: 'sc200' },
    { from: 'sc200',   to: 'cissp' },

    { from: 'az900',   to: 'az104' },
    { from: 'az104',   to: 'az500' },
    { from: 'az500',   to: 'cissp' },

    { from: 'tf',      to: 'cka' },
    { from: 'cka',     to: 'cissp' }
  ]
};

export const projects = [
  {
    title: "ML-Based Network Intrusion Detection System",
    description: "Architected a Deep Learning Network Intrusion Detection System (NIDS) using LSTM neural networks to classify 9 cybersecurity threat categories with 95%+ accuracy across 100K+ network traffic samples from UNSW-NB15 dataset. Implemented MLOps monitoring via Tableau Cloud to visualize inference confidence and detect concept drift, enabling proactive model retraining.",
    tech: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "Tableau"],
    highlights: ["95%+ accuracy", "LSTM neural networks", "Real-time threat detection"]
  },
  {
    title: "Computa",
    description: "Three-tier agentic AI pipeline on Discord (Nemotron Swarm Agent). Routes user prompts through a classifier that decides between local inference via Ollama + Nemotron-mini and escalation to NVIDIA NIM cloud models. Persists conversation memory in SQLite with a demo_cache fallback when cloud credits are low, and exposes an Express dashboard for routing telemetry.",
    tech: ["Node.js", "Python", "Discord.js", "Ollama", "NVIDIA NIM", "SQLite", "Express"],
    highlights: ["Local + cloud LLM routing", "Agentic task classification", "Persistent SQLite memory"]
  },
  {
    title: "DubBetter Ring",
    description: "An intelligent doorbell and security camera system built for DubHacks 2025 that combines real-time video streaming with AI-powered object detection. The platform streams live 1080p HD video from a Raspberry Pi camera to a web dashboard, where users can monitor their front door with automatic motion detection and person recognition.",
    tech: ["React", "TensorFlow", "OpenCV", "Raspberry Pi", "Socket.io", "TailwindCSS"],
    highlights: ["Real-time 1080p streaming", "AI object detection", "Instant notifications"]
  },
  {
    title: "Game Server Automation",
    description: "Designed and implemented a fully automated infrastructure-as-code solution for deploying a containerized Minecraft server on AWS. The system automatically configures complete AWS networking architecture including VPC, security groups, and EC2 instances.",
    tech: ["AWS EC2", "Docker", "Terraform"],
    highlights: ["Single-command deployment", "Infrastructure as Code", "Persistent storage"]
  },
  {
    title: "BrainBurst",
    description: "Built a full-stack flashcard learning platform featuring end-to-end encryption and JWT authentication to protect user study data. Engineered interactive study modes with spaced repetition algorithms and responsive design.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Supabase"],
    highlights: ["E2E encryption", "Spaced repetition", "JWT auth"]
  },
  {
    title: "Terminal Portfolio",
    description: "An interactive terminal-style portfolio website that showcases my skills and projects through a command-line interface experience.",
    tech: ["React", "JavaScript", "CSS"],
    highlights: ["Interactive CLI", "Command history", "Tab autocomplete"]
  }
];

export const seeking = [
  "Cybersecurity",
  "Cloud Engineering & Security",
  "DevOps / SecOps",
  "Network Engineering",
  "Governance, Risk & Compliance"
];
