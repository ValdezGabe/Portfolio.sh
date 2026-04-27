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

I have a strong foundation in networking, system administration, and problem-solving. I'm currently seeking internship opportunities in cybersecurity, IT, or data analysis where I can apply my skills and grow as a professional.`;

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

export const certifications = [
  { name: "CompTIA A+", status: "completed" },
    { name: "Azure AZ-900", status: "completed"},
  { name: "CompTIA Network+", status: "in-progress" },
  { name: "CompTIA Security+", status: "in-progress" }
];

export const skills = {
  languages: ["Python", "C", "C++", "SQL", "PHP", "JavaScript", "Node.js", "CSS", "HTML", "Prolog", "Haskell"],
  frameworks: ["React", "Express", "TensorFlow", "TensorFlow Lite"],
  tools: ["AWS", "Docker", "NumPy", "OpenCV", "Git", "CUDA", "Ansible", "Terraform", "Bash", "PowerShell"],
  security: ["Wireshark", "ELK Stack", "Elasticsearch", "Kibana", "Logstash"],
  systems: ["Linux", "Kali Linux", "Ubuntu", "Alma Linux", "Active Directory", "VMware", "VirtualBox", "TCP/IP"]
};

export const projects = [
  {
    title: "ML-Based Network Intrusion Detection System",
    description: "Architected a Deep Learning Network Intrusion Detection System (NIDS) using LSTM neural networks to classify 9 cybersecurity threat categories with 95%+ accuracy across 100K+ network traffic samples from UNSW-NB15 dataset. Implemented MLOps monitoring via Tableau Cloud to visualize inference confidence and detect concept drift, enabling proactive model retraining.",
    tech: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "Tableau"],
    highlights: ["95%+ accuracy", "LSTM neural networks", "Real-time threat detection"]
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
  "Cloud Security",
  "Network Engineering",
  "IT/System Administration",
  "Governance, Risk, and Compliance",
  "Software Development"
];
