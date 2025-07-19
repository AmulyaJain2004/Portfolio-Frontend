import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';
import avatar from '../assets/iamhandsome8.jpg'; // Replace with your avatar image
import { FaArrowUp, FaEnvelope, FaYoutube, FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import EducationCard from '../components/EducationCard';
import '../avatar-animate.css';

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/skills/')
      .then(res => res.json())
      .then(setSkills);
    fetch('http://127.0.0.1:8000/api/certifications/')
      .then(res => res.json())
      .then(setCertifications);
    fetch('http://127.0.0.1:8000/api/projects/')
      .then(res => res.json())
      .then(setProjects);
    fetch('http://127.0.0.1:8000/api/education/')
      .then(res => res.json())
      .then(setEducation);
    fetch('http://127.0.0.1:8000/api/experience/')
      .then(res => res.json())
      .then(setExperience);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="bg-black text-gray-100 min-h-screen flex flex-col items-center px-2 sm:px-0">
        <div className="w-full max-w-3xl flex flex-col gap-0 mt-4 border-l border-r border-gray-700 relative px-4 sm:px-8 pt-20">
          <section id="profile" className="w-full flex flex-col items-center gap-6 relative z-10 border border-gray-700 bg-black rounded-2xl shadow p-8">
            <div className="w-full flex flex-col sm:flex-row items-center gap-8">
              <div className="relative group">
                <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-yellow-300 p-1 sm:p-2 rounded-full shadow-lg transition-all duration-300 w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] flex items-center justify-center group-hover:animate-gradient-spin">
                  <img src={avatar} alt="Avatar" className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-black object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-black" />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-yellow-200 mb-2 text-center sm:text-left">Welcome to My World</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-indigo-200 mb-4 text-center sm:text-left">Showcasing my work, skills, and journey as a developer.</p>
                <div className="w-full bg-black rounded-2xl shadow p-6 border border-gray-700 text-center sm:text-left flex flex-col gap-3">
                  <span className="text-lg text-indigo-200 font-semibold">Amulya Jain</span>
                  <span className="text-gray-300 font-medium">Computer Science Undergrad &mdash; Specializing in Artificial Intelligence and Machine Learning</span>
                  <p className="text-gray-400 text-base mt-2">
                    Passionate about developing intelligent, data-driven solutions using Python, modern ML frameworks, and full-stack technologies. Open to AI-focused internships, freelance roles, and collaborative research projects to apply and expand my skills.
                  </p>
                </div>
                <div className="w-full flex flex-wrap justify-center gap-4 my-4 border border-gray-700 rounded-2xl bg-gray-900/80 p-4">
                  {/* Coding/Social Platforms Grid */}
                  <a href="https://kaggle.com/amulyajain@2004" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/kaggle.svg" alt="Kaggle" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">Kaggle</span>
                  </a>
                  <a href="https://hashnode.com/@alokik89" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hashnode.svg" alt="Hashnode" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">Hashnode</span>
                  </a>
                  <a href="https://www.codechef.com/users/alokik_engg_89" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg" alt="CodeChef" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">CodeChef</span>
                  </a>
                  <a href="https://www.hackerrank.com/profile/jainamulyawin" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hackerrank.svg" alt="HackerRank" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">HackerRank</span>
                  </a>
                  <a href="https://www.leetcode.com/amulya_89-curious" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">LeetCode</span>
                  </a>
                  <a href="https://auth.geeksforgeeks.org/user/user_6jg2kzes1gw" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/geeks-for-geeks.svg" alt="GeeksforGeeks" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">GFG</span>
                  </a>
                  <a href="https://www.topcoder.com/members/amulya[2004]" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/topcoder.svg" alt="TopCoder" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">TopCoder</span>
                  </a>
                  <a href="https://github.com/AmulyaJain2004" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="GitHub" height="30" width="30" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">GitHub</span>
                  </a>
                  <a href="https://codeforces.com/profile/dark_alokik_engg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-110 transition">
                    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codeforces.svg" alt="Codeforces" height="30" width="40" />
                    <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">Codeforces</span>
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center sm:justify-start mt-4">
                  <a href="#projects" className="inline-block px-4 py-2 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-sm text-center w-full sm:w-auto">See My Projects</a>
                  <a href="https://drive.google.com/file/d/1Qw7QwQwQwQwQwQwQwQwQwQwQwQwQwQw/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-sm text-center w-full sm:w-auto flex items-center justify-center gap-1 align-middle"
                    style={{ minWidth: '140px' }}
                  >
                    <FaDownload className="inline align-middle text-base" style={{marginBottom: '2px'}} />
                    <span className="inline align-middle"> View Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="skills" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow">
            <SectionHeader title="Skills" />
            <SkillsTable />
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="certifications" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow">
            <SectionHeader title="Certifications" />
            <div className="grid grid-cols-1 gap-6 w-full">
              {certifications.map(cert => (
                <div key={cert.id} className="bg-black border border-gray-700 rounded-xl shadow p-4 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <span className="font-semibold text-indigo-300">{cert.name}</span>
                    <span className="text-gray-500 text-xs ml-2">{cert.issuer}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{new Date(cert.date_obtained).toLocaleDateString()}</span>
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-xs hover:underline">View Credential</a>
                  )}
                </div>
              ))}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="projects" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow">
            <SectionHeader title="Projects" />
            <ProjectsGrid />
            <div className="w-full flex justify-center mt-6 mb-2">
              <a
                href="/projects"
                className="inline-block px-4 py-2 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-sm text-center"
              >
                View All Projects
              </a>
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="education" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow">
            <SectionHeader title="Education" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {education.map(edu => (
                <EducationCard key={edu.id} education={edu} />
              ))}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="experience" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow">
            <SectionHeader title="Experience" />
            <div className="w-full flex flex-col gap-6">
              {experience.map(exp => (
                <div key={exp.id} className="bg-black border border-gray-700 rounded-xl shadow p-4 flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <span className="font-semibold text-indigo-300 text-lg">{exp.title}</span>
                    <span className="text-gray-400 text-sm ml-2">{exp.organization}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{new Date(exp.start_date).toLocaleDateString()} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}</span>
                  {exp.description && <span className="text-gray-400 text-xs mt-1">{exp.description}</span>}
                </div>
              ))}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
          <section id="contact" className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow mb-8">
            <SectionHeader title="Contact" />
            <p className="text-gray-400 text-center mb-4">Let's connect! Fill out the form below and I'll get back to you soon.</p>
            <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-center">
              {/* Socials/Address Card */}
              <div
                className="flex flex-col gap-6 w-full md:w-1/3 items-center md:items-start bg-black border border-gray-700 rounded-2xl shadow-lg p-6 md:mb-4 md:mt-2 mb-6 md:ml-4"
              >
                <h3 className="text-lg font-bold text-gray-100 mb-2 tracking-wide">Get in Touch</h3>
                <div className="flex flex-col gap-3 w-full divide-y divide-gray-800">
                  <a href="mailto:Amulya.122439@stu.upes.ac.in" className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base" title="Email Amulya Jain">
                    <FaEnvelope size={22} /> Mail
                  </a>
                  <a href="https://www.youtube.com/@TensorQuake-Aj89" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"><FaYoutube size={22}/> YouTube</a>
                  <a href="https://linkedin.com/in/amulya-jain04/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"><FaLinkedin size={22}/> LinkedIn</a>
                  <a href="https://github.com/AmulyaJain2004" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"><FaGithub size={22}/> GitHub</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mt-4 text-base"><FaMapMarkerAlt size={20}/> Dehradun, Uttarakhand</div>
              </div>
              {/* Contact Form */}
              <div className="w-full md:w-2/3 flex justify-center md:mr-4">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 bg-indigo-600 dark:bg-indigo-900 text-white dark:text-yellow-200 p-3 rounded-full shadow transition-opacity duration-300 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'} hover:bg-indigo-800 dark:hover:bg-indigo-700 active:scale-95`}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
      <Footer />
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-black border border-gray-700 rounded-2xl shadow p-6 flex flex-col gap-4">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={4} required className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition" />
      <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-base text-center disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <div className="text-center mt-2 text-sm text-indigo-400">{status}</div>}
    </form>
  );
}

// Add SkillsTable component
function SkillsTable() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Removed intervalRef

  useEffect(() => {
    let isMounted = true;
    const fetchSkills = () => {
      setLoading(true);
      fetch('http://127.0.0.1:8000/api/skills/')
        .then(res => res.json())
        .then(data => { if (isMounted) setSkills(data); })
        .catch(() => { if (isMounted) setError('Failed to fetch skills.'); })
        .finally(() => { if (isMounted) setLoading(false); });
    };
    fetchSkills();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <div className="w-full flex justify-center items-center py-8"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span> <span>Loading...</span></div>;
  }
  if (error) {
    return <div className="w-full text-center text-red-400 py-4">{error}</div>;
  }
  if (!skills.length) {
    return <div className="w-full text-center text-gray-400 py-4">No skills found.</div>;
  }

  // Group skills by main category and subcategory (subcategory may be null)
  const grouped = useMemo(() => {
    const result = {};
    skills.forEach(skill => {
      const main = skill.main_category ? skill.main_category.name : 'Uncategorized';
      const sub = skill.subcategory && skill.subcategory.name ? skill.subcategory.name : null;
      if (!result[main]) result[main] = {};
      if (!result[main][sub]) result[main][sub] = [];
      result[main][sub].push(skill);
    });
    return result;
  }, [skills]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-700 text-gray-100 text-sm">
        <thead>
          <tr className="bg-black">
            <th className="border border-gray-700 px-4 py-2">Main Category</th>
            <th className="border border-gray-700 px-4 py-2">Subcategory</th>
            <th className="border border-gray-700 px-4 py-2" colSpan="5">Technologies / Tools</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([main, subcats], i) => {
            const subcatNames = Object.keys(subcats);
            return subcatNames.map((sub, j) => {
              const skillsArr = subcats[sub];
              return (
                <tr key={main + (sub || 'none')}>
                  {j === 0 && (
                    <td rowSpan={subcatNames.length} className="border border-gray-700 px-4 py-2 font-bold align-top bg-black whitespace-nowrap">
                      {main}
                    </td>
                  )}
                  {/* Only show subcategory cell if subcategory exists, else empty cell */}
                  {skillsArr[0] && skillsArr[0].subcategory && skillsArr[0].subcategory.name ? (
                    <td className="border border-gray-700 px-4 py-2 bg-black whitespace-nowrap">{skillsArr[0].subcategory.name}</td>
                  ) : (
                    <td className="border border-gray-700 px-4 py-2 bg-black whitespace-nowrap"></td>
                  )}
                  <td className="border border-gray-700 px-4 py-2 bg-black">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {skillsArr.map(skill => (
                        <SkillIcon key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

// SkillIcon with fallback
const SkillIcon = React.memo(function SkillIcon({ skill }) {
  const [imgError, setImgError] = useState(false);
  const handleImgError = useCallback(() => setImgError(true), []);
  return (
    <a
      href={skill.doc_link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group hover:text-indigo-400 transition"
    >
      {skill.icon_url && !imgError ? (
        <img
          src={skill.icon_url}
          alt={skill.name}
          className="w-10 h-10 mb-1 rounded bg-gray-900 border border-gray-800 object-contain"
          onError={handleImgError}
        />
      ) : (
        <span className="w-10 h-10 mb-1 flex items-center justify-center bg-gray-800 rounded text-gray-500">?</span>
      )}
      <span className="text-xs text-center group-hover:underline">{skill.name}</span>
    </a>
  );
});

// Add ProjectsGrid component
function ProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Removed intervalRef

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = () => {
      setLoading(true);
      fetch('http://127.0.0.1:8000/api/projects/')
        .then(res => res.json())
        .then(data => { if (isMounted) setProjects(data); })
        .catch(() => { if (isMounted) setError('Failed to fetch projects.'); })
        .finally(() => { if (isMounted) setLoading(false); });
    };
    fetchProjects();
    return () => { isMounted = false; };
  }, []);

  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);

  if (loading) {
    return <div className="w-full flex justify-center items-center py-8"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span> <span>Loading...</span></div>;
  }
  if (error) {
    return <div className="w-full text-center text-red-400 py-4">{error}</div>;
  }
  if (!featuredProjects.length) {
    return <div className="w-full text-center text-gray-400 py-4">No featured projects found.</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
