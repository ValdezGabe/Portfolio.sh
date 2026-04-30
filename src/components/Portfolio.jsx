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
import './Portfolio.css';

const COL_W = 220;
const ROW_H = 110;
const VB_W = certGraph.branches.length * COL_W;
const VB_H = (Math.max(...certGraph.nodes.map(n => n.row)) + 1) * ROW_H;

const nodeCenter = (n) => ({
  x: n.col * COL_W + COL_W / 2,
  y: n.row * ROW_H + ROW_H / 2
});

const edgePath = (a, b) => {
  const p1 = nodeCenter(a);
  const p2 = nodeCenter(b);
  if (p1.x === p2.x) return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  // Git-graph merge curve: drop down branch, then sweep to capstone.
  const turnY = p2.y - ROW_H * 0.55;
  return `M ${p1.x} ${p1.y} L ${p1.x} ${turnY} C ${p1.x} ${p2.y} ${p1.x} ${p2.y} ${p2.x} ${p2.y}`;
};

const nodeById = Object.fromEntries(certGraph.nodes.map(n => [n.id, n]));

const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned'
};

const statusIcon = {
  completed: '✓',
  'in-progress': '◐',
  planned: '○'
};

const Portfolio = () => {
  return (
    <div className="portfolio">
      {/* About Section */}
      <section className="portfolio-section about-section" id="about">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <p className="about-text">{about}</p>
          <p className="quote">{personalInfo.quote}</p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="portfolio-section experience-section" id="experience">
        <div className="section-content">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {experience.map((job, i) => (
              <div key={i} className={`timeline-item ${job.upcoming ? 'upcoming' : ''}`}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-head">
                    <h3 className="job-title">
                      {job.title}
                      {job.upcoming && <span className="upcoming-badge">Incoming</span>}
                    </h3>
                    <span className="job-period">{job.period}</span>
                  </div>
                  <div className="job-meta">
                    <span className="job-company">{job.company}</span>
                    <span className="job-location">{job.location}</span>
                  </div>
                  <ul className="job-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="portfolio-section skills-section" id="skills">
        <div className="section-content">
          <h2 className="section-title">Technical Skills</h2>

          <div className="core-skills-grid">
            {coreSkills.map((skill, i) => (
              <div key={i} className="core-skill-card">
                <img
                  className="core-skill-icon"
                  src={skill.iconSrc || `https://cdn.simpleicons.org/${skill.icon}/${skill.color}`}
                  alt={`${skill.name} logo`}
                  loading="lazy"
                />
                <div className="core-skill-info">
                  <span className="core-skill-name">{skill.name}</span>
                  <span className="core-skill-years">
                    {skill.years} {skill.years === 1 ? 'year' : 'years'}
                  </span>
                </div>
                <div className="core-skill-bar">
                  <div
                    className="core-skill-bar-fill"
                    style={{ width: `${Math.min(skill.years / 5, 1) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="additional-skills">
            <h3 className="additional-skills-title">Additional Tooling</h3>
            <div className="additional-skills-grid">
              {Object.entries(additionalSkills).map(([category, items]) => (
                <div key={category} className="skill-category">
                  <h4>{category}</h4>
                  <div className="skill-tags">
                    {items.map((item, i) => (
                      <span key={i} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Roadmap — git-graph */}
      <section className="portfolio-section certifications-section" id="certifications">
        <div className="section-content">
          <h2 className="section-title">Certification Roadmap</h2>
          <p className="roadmap-legend">
            <span className="legend-item completed">{statusIcon.completed} Completed</span>
            <span className="legend-item in-progress">{statusIcon['in-progress']} In Progress</span>
            <span className="legend-item planned">{statusIcon.planned} Planned</span>
          </p>

          <div className="cert-graph">
            <div className="cert-graph-branches">
              {certGraph.branches.map(b => (
                <div key={b.id} className="cert-branch-label" style={{ left: `${(b.col + 0.5) * (100 / certGraph.branches.length)}%` }}>
                  {b.label}
                </div>
              ))}
            </div>

            <div className="cert-graph-canvas" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
              <svg
                className="cert-graph-edges"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {certGraph.edges.map((e, i) => {
                  const a = nodeById[e.from];
                  const b = nodeById[e.to];
                  return (
                    <path
                      key={i}
                      d={edgePath(a, b)}
                      className={`cert-edge ${a.status} ${b.capstone ? 'merge' : ''}`}
                    />
                  );
                })}
              </svg>

              {certGraph.nodes.map(n => {
                const c = nodeCenter(n);
                return (
                  <div
                    key={n.id}
                    className={`cert-node ${n.status} ${n.capstone ? 'capstone' : ''}`}
                    style={{
                      left: `${(c.x / VB_W) * 100}%`,
                      top: `${(c.y / VB_H) * 100}%`
                    }}
                  >
                    <div className="cert-node-marker">{statusIcon[n.status]}</div>
                    <div className="cert-node-body">
                      <span className="cert-node-name">{n.name}</span>
                      <span className="cert-node-status">{statusLabel[n.status]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="portfolio-section education-section" id="education">
        <div className="section-content">
          <h2 className="section-title">Education</h2>
          <div className="education-card">
            <h3>{education.school}</h3>
            <p className="degree">{education.degree} | {education.minor}</p>
            <p className="focus">Focus: {education.focus}</p>
            <div className="education-details">
              <span>Expected: {education.graduation}</span>
              <span>GPA: {education.gpa}</span>
            </div>
            <div className="coursework">
              <h4>Relevant Coursework</h4>
              <ul>
                {education.coursework.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="portfolio-section projects-section" id="projects">
        <div className="section-content">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={i} className="project-card">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-highlights">
                  {project.highlights.map((highlight, j) => (
                    <span key={j} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seeking Section */}
      <section className="portfolio-section seeking-section" id="seeking">
        <div className="section-content">
          <h2 className="section-title">Looking for Opportunities</h2>
          <p className="seeking-text">Targeting roles in:</p>
          <div className="seeking-areas">
            {seeking.map((area, i) => (
              <span key={i} className="seeking-tag">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="portfolio-section contact-section" id="contact">
        <div className="section-content">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <a href={`mailto:${personalInfo.email}`} className="contact-card">
              <span className="contact-icon">@</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/[^0-9]/g, '')}`} className="contact-card">
              <span className="contact-icon">#</span>
              <span className="contact-label">Phone</span>
              <span className="contact-value">{personalInfo.phone}</span>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-icon">in</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">gabemvaldez</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-icon">&lt;/&gt;</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">ValdezGabe</span>
            </a>
          </div>
          <a href="/resume.pdf" download="Gabe_Valdez_Resume.pdf" className="resume-button">
            Download Resume
          </a>
        </div>
      </section>

      <footer className="portfolio-footer">
        <p>Built with React | Designed by Gabe Valdez</p>
      </footer>
    </div>
  );
};

export default Portfolio;
