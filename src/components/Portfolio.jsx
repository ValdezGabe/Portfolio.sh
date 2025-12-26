import { personalInfo, about, education, certifications, skills, projects, seeking } from '../data/portfolioData';
import './Portfolio.css';

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

      {/* Skills Section */}
      <section className="portfolio-section skills-section" id="skills">
        <div className="section-content">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <div className="skill-tags">
                {skills.languages.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Frameworks</h3>
              <div className="skill-tags">
                {skills.frameworks.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <div className="skill-tags">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
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

      {/* Certifications Section */}
      <section className="portfolio-section certifications-section" id="certifications">
        <div className="section-content">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <div key={i} className={`cert-card ${cert.status}`}>
                <span className="cert-icon">
                  {cert.status === 'completed' ? '✓' : '⏳'}
                </span>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-status">
                  {cert.status === 'completed' ? 'Certified' : 'In Progress'}
                </span>
              </div>
            ))}
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

      {/* Experience Section */}
      <section className="portfolio-section experience-section" id="experience">
        <div className="section-content">
          <h2 className="section-title">Looking for Opportunities</h2>
          <p className="seeking-text">Currently seeking internship positions in:</p>
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
