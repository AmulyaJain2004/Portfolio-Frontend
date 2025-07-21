import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import avatar from "../assets/iamhandsome8.jpg"; // Replace with your avatar image
import {
  FaArrowUp,
  FaEnvelope,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";
import EducationCard from "../components/EducationCard";
import "../avatar-animate.css";
import config from "../config";

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cache management
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  const CACHE_KEYS = {
    skills: "portfolio_skills_cache",
    certifications: "portfolio_certifications_cache",
    projects: "portfolio_projects_cache",
    education: "portfolio_education_cache",
    experience: "portfolio_experience_cache",
    timestamp: "portfolio_cache_timestamp",
  };

  const getCachedData = (key) => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS[key]);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error(`Error parsing cached ${key}:`, error);
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      localStorage.setItem(CACHE_KEYS[key], JSON.stringify(data));
    } catch (error) {
      console.error(`Error caching ${key}:`, error);
    }
  };

  const isCacheValid = () => {
    const timestamp = localStorage.getItem(CACHE_KEYS.timestamp);
    if (!timestamp) return false;
    return Date.now() - parseInt(timestamp) < CACHE_DURATION;
  };

  const loadCachedData = () => {
    const cachedSkills = getCachedData("skills");
    const cachedCertifications = getCachedData("certifications");
    const cachedProjects = getCachedData("projects");
    const cachedEducation = getCachedData("education");
    const cachedExperience = getCachedData("experience");

    if (cachedSkills)
      setSkills(Array.isArray(cachedSkills) ? cachedSkills : []);
    if (cachedCertifications)
      setCertifications(
        Array.isArray(cachedCertifications) ? cachedCertifications : []
      );
    if (cachedProjects)
      setProjects(Array.isArray(cachedProjects) ? cachedProjects : []);
    if (cachedEducation)
      setEducation(Array.isArray(cachedEducation) ? cachedEducation : []);
    if (cachedExperience)
      setExperience(Array.isArray(cachedExperience) ? cachedExperience : []);

    return !!(
      cachedSkills ||
      cachedCertifications ||
      cachedProjects ||
      cachedEducation ||
      cachedExperience
    );
  };

  useEffect(() => {
    const initializeData = async () => {
      // Check if cache is valid and load cached data
      if (isCacheValid()) {
        const hasCachedData = loadCachedData();
        if (hasCachedData) {
          setIsLoading(false);

          // Optionally fetch fresh data in background to keep cache updated
          setTimeout(() => {
            fetchDataInBackground();
          }, 1000);

          return;
        }
      }

      // No valid cache or first visit - show loading and fetch data
      await fetchData();
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          skillsRes,
          certificationsRes,
          projectsRes,
          educationRes,
          experienceRes,
        ] = await Promise.all([
          fetch(`${config.apiBaseUrl}/api/skills/`),
          fetch(`${config.apiBaseUrl}/api/certifications/`),
          fetch(`${config.apiBaseUrl}/api/projects/`),
          fetch(`${config.apiBaseUrl}/api/education/`),
          fetch(`${config.apiBaseUrl}/api/experience/`),
        ]);

        let hasNewData = false;

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          const validSkills = Array.isArray(skillsData) ? skillsData : [];
          setSkills(validSkills);
          setCachedData("skills", validSkills);
          hasNewData = true;
        }
        if (certificationsRes.ok) {
          const certificationsData = await certificationsRes.json();
          const validCertifications = Array.isArray(certificationsData)
            ? certificationsData
            : [];
          setCertifications(validCertifications);
          setCachedData("certifications", validCertifications);
          hasNewData = true;
        }
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          const validProjects = Array.isArray(projectsData) ? projectsData : [];
          setProjects(validProjects);
          setCachedData("projects", validProjects);
          hasNewData = true;
        }
        if (educationRes.ok) {
          const educationData = await educationRes.json();
          const validEducation = Array.isArray(educationData)
            ? educationData
            : [];
          setEducation(validEducation);
          setCachedData("education", validEducation);
          hasNewData = true;
        }
        if (experienceRes.ok) {
          const experienceData = await experienceRes.json();
          const validExperience = Array.isArray(experienceData)
            ? experienceData
            : [];
          setExperience(validExperience);
          setCachedData("experience", validExperience);
          hasNewData = true;
        }

        // Update cache timestamp if we got new data
        if (hasNewData) {
          localStorage.setItem(CACHE_KEYS.timestamp, Date.now().toString());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Try to load any cached data as fallback
        const hasCachedData = loadCachedData();
        if (!hasCachedData) {
          // Ensure all states remain as arrays even on error
          setSkills([]);
          setCertifications([]);
          setProjects([]);
          setEducation([]);
          setExperience([]);
        }
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    const fetchDataInBackground = async () => {
      // Fetch data silently in background to update cache
      try {
        const [
          skillsRes,
          certificationsRes,
          projectsRes,
          educationRes,
          experienceRes,
        ] = await Promise.all([
          fetch(`${config.apiBaseUrl}/api/skills/`),
          fetch(`${config.apiBaseUrl}/api/certifications/`),
          fetch(`${config.apiBaseUrl}/api/projects/`),
          fetch(`${config.apiBaseUrl}/api/education/`),
          fetch(`${config.apiBaseUrl}/api/experience/`),
        ]);

        let hasUpdates = false;

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          const validSkills = Array.isArray(skillsData) ? skillsData : [];
          setCachedData("skills", validSkills);
          setSkills(validSkills);
          hasUpdates = true;
        }
        if (certificationsRes.ok) {
          const certificationsData = await certificationsRes.json();
          const validCertifications = Array.isArray(certificationsData)
            ? certificationsData
            : [];
          setCachedData("certifications", validCertifications);
          setCertifications(validCertifications);
          hasUpdates = true;
        }
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          const validProjects = Array.isArray(projectsData) ? projectsData : [];
          setCachedData("projects", validProjects);
          setProjects(validProjects);
          hasUpdates = true;
        }
        if (educationRes.ok) {
          const educationData = await educationRes.json();
          const validEducation = Array.isArray(educationData)
            ? educationData
            : [];
          setCachedData("education", validEducation);
          setEducation(validEducation);
          hasUpdates = true;
        }
        if (experienceRes.ok) {
          const experienceData = await experienceRes.json();
          const validExperience = Array.isArray(experienceData)
            ? experienceData
            : [];
          setCachedData("experience", validExperience);
          setExperience(validExperience);
          hasUpdates = true;
        }

        if (hasUpdates) {
          localStorage.setItem(CACHE_KEYS.timestamp, Date.now().toString());
          console.log("Portfolio data updated in background");
        }
      } catch (error) {
        console.warn("Background data fetch failed:", error);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show preloader while content is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Loading Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-200 mb-2">
              Loading Portfolio
            </h2>
            <p className="text-indigo-200 text-base mb-6">
              Fetching latest content...
            </p>
          </div>

          {/* Main Loading Spinner */}
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
            <span className="text-gray-300 text-base">Please wait</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-black text-gray-100 min-h-screen flex flex-col items-center px-2 sm:px-0">
        <div className="w-full max-w-3xl flex flex-col gap-0 mt-4 border-l border-r border-gray-700 relative px-4 sm:px-8 pt-20">
          <section
            id="profile"
            className="w-full flex flex-col items-center relative z-10 border border-gray-700 bg-black rounded-2xl shadow p-6 sm:p-8"
          >
            {/* Header Section */}
            <div className="w-full text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-200 mb-3">
                Welcome to My World
              </h1>
              <p className="text-base sm:text-lg text-indigo-200">
                Showcasing my work, skills, and journey as a developer.
              </p>
            </div>

            {/* Main Profile Content */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="relative group">
                <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-yellow-300 p-1 sm:p-2 rounded-full shadow-lg transition-all duration-300 w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] flex items-center justify-center group-hover:animate-gradient-spin">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-black object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-black"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start">
                <div className="w-full bg-black rounded-2xl shadow p-6 border border-gray-700 text-center sm:text-left flex flex-col gap-3">
                  <span className="text-lg text-indigo-200 font-semibold">
                    Amulya Jain
                  </span>
                  <span className="text-gray-300 font-medium">
                    Pre-Final year CS Undergrad, AI & ML Engineer, Full-Stack ML
                    Developer
                  </span>
                  <p className="text-gray-400 text-base mt-2">
                    Passionate about building intelligent, data-driven systems
                    using Python, modern ML frameworks, and full-stack web
                    technologies. Experienced in deploying real-world NLP,
                    voice-AI, and predictive analytics solutions. Actively
                    exploring Deep Learning, Generative AI, LLMs, LLMOps, and
                    MLOps to build scalable, production-ready AI systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Platforms */}
            <div className="w-full flex flex-wrap justify-center gap-4 my-6 border border-gray-700 rounded-2xl bg-gray-900/80 p-4">
              {/* Coding/Social Platforms Grid */}
              <a
                href="https://kaggle.com/amulyajain@2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/kaggle.svg"
                  alt="Kaggle"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  Kaggle
                </span>
              </a>
              <a
                href="https://hashnode.com/@alokik89"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hashnode.svg"
                  alt="Hashnode"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  Hashnode
                </span>
              </a>
              <a
                href="https://www.codechef.com/users/alokik_engg_89"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg"
                  alt="CodeChef"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  CodeChef
                </span>
              </a>
              <a
                href="https://www.hackerrank.com/profile/jainamulyawin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hackerrank.svg"
                  alt="HackerRank"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  HackerRank
                </span>
              </a>
              <a
                href="https://www.leetcode.com/amulya_89-curious"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg"
                  alt="LeetCode"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  LeetCode
                </span>
              </a>
              <a
                href="https://auth.geeksforgeeks.org/user/user_6jg2kzes1gw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/geeks-for-geeks.svg"
                  alt="GeeksforGeeks"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  GFG
                </span>
              </a>
              <a
                href="https://www.topcoder.com/members/amulya[2004]"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/topcoder.svg"
                  alt="TopCoder"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  TopCoder
                </span>
              </a>
              <a
                href="https://github.com/AmulyaJain2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
                  alt="GitHub"
                  height="30"
                  width="30"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  GitHub
                </span>
              </a>
              <a
                href="https://codeforces.com/profile/dark_alokik_engg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group hover:scale-110 transition"
              >
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codeforces.svg"
                  alt="Codeforces"
                  height="30"
                  width="40"
                />
                <span className="text-xs mt-1 text-indigo-200 group-hover:underline font-semibold">
                  Codeforces
                </span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
              <a
                href="#projects"
                className="inline-block px-6 py-3 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-sm text-center w-full sm:w-auto"
              >
                See My Projects
              </a>
              <a
                href="https://drive.google.com/file/d/1LP-SSP8Oe_K-AILvDRoytno9QdzTQeYM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-sm text-center w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <FaDownload className="text-base" />
                <span>View Resume</span>
              </a>
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="skills"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow"
          >
            <SectionHeader title="Skills" />
            <SkillsTable skills={skills} />
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="experience"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow"
          >
            <SectionHeader title="Experience" />
            <div className="w-full flex flex-col gap-6">
              {experience && experience.length > 0 ? (
                experience.map((exp) => (
                  <div
                    key={exp?.id || Math.random()}
                    className="bg-black border border-gray-700 rounded-xl shadow p-4 flex flex-col gap-1"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className="font-semibold text-indigo-300 text-lg">
                        {exp?.title || "Unknown Position"}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">
                        {exp?.organization || "Unknown Organization"}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {exp?.start_date
                        ? new Date(exp.start_date).toLocaleDateString()
                        : "Start date unknown"}{" "}
                      -{" "}
                      {exp?.end_date
                        ? new Date(exp.end_date).toLocaleDateString()
                        : "Present"}
                    </span>
                    {exp?.description && (
                      <span className="text-gray-400 text-xs mt-1">
                        {exp.description}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No experience information available
                </div>
              )}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="education"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow"
          >
            <SectionHeader title="Education" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <EducationCard
                    key={edu?.id || Math.random()}
                    education={edu}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-4 col-span-full">
                  No education information available
                </div>
              )}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="projects"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow"
          >
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
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="certifications"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow"
          >
            <SectionHeader title="Certifications" />
            <div className="grid grid-cols-1 gap-6 w-full">
              {certifications && certifications.length > 0 ? (
                certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-black border border-gray-700 rounded-xl shadow p-4 flex flex-col gap-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className="font-semibold text-indigo-300">
                        {cert?.name || "Unknown Certification"}
                      </span>
                      <span className="text-gray-500 text-xs ml-2">
                        {cert?.issuer || "Unknown Issuer"}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {cert?.date_obtained
                        ? new Date(cert.date_obtained).toLocaleDateString()
                        : "Date unknown"}
                    </span>
                    {cert?.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 text-xs hover:underline"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No certifications available
                </div>
              )}
            </div>
          </section>
          <div className="my-8 w-full flex justify-center relative">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
          <section
            id="contact"
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow mb-8 scroll-section"
            style={{ scrollMarginTop: "100px" }}
          >
            <SectionHeader title="Contact" />
            <p className="text-gray-400 text-center mb-4">
              Let's connect! Fill out the form below and I'll get back to you
              soon.
            </p>
            <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-center">
              {/* Socials/Address Card */}
              <div className="flex flex-col gap-6 w-full md:w-1/3 items-center md:items-start bg-black border border-gray-700 rounded-2xl shadow-lg p-6 md:mb-4 md:mt-2 mb-6 md:ml-4">
                <h3 className="text-lg font-bold text-gray-100 mb-2 tracking-wide">
                  Get in Touch
                </h3>
                <div className="flex flex-col gap-3 w-full divide-y divide-gray-800">
                  <a
                    href="mailto:Amulya.122439@stu.upes.ac.in"
                    className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"
                    title="Email Amulya Jain"
                  >
                    <FaEnvelope size={22} /> Mail
                  </a>
                  <a
                    href="https://www.youtube.com/@TensorQuake-Aj89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"
                  >
                    <FaYoutube size={22} /> YouTube
                  </a>
                  <a
                    href="https://linkedin.com/in/amulya-jain04/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"
                  >
                    <FaLinkedin size={22} /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/AmulyaJain2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 text-gray-100 hover:text-indigo-400 transition text-base"
                  >
                    <FaGithub size={22} /> GitHub
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mt-4 text-base">
                  <FaMapMarkerAlt size={20} /> Dehradun, Uttarakhand
                </div>
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
          className={`fixed bottom-6 right-6 z-50 bg-indigo-600 dark:bg-indigo-900 text-white dark:text-yellow-200 p-3 rounded-full shadow transition-opacity duration-300 ${
            showScroll ? "opacity-100" : "opacity-0 pointer-events-none"
          } hover:bg-indigo-800 dark:hover:bg-indigo-700 active:scale-95`}
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${config.apiBaseUrl}/api/messages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Failed to send message.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-black border border-gray-700 rounded-2xl shadow p-6 flex flex-col gap-4"
    >
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        rows={4}
        required
        className="px-4 py-2 rounded border border-gray-700 bg-black text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-full bg-black text-yellow-300 font-bold shadow border-2 border-yellow-300 hover:text-indigo-700 hover:border-indigo-700 transition-colors text-base text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && (
        <div className="text-center mt-2 text-sm text-indigo-400">{status}</div>
      )}
    </form>
  );
}

// Add SkillsTable component
function SkillsTable({ skills }) {
  // Group skills by main category and subcategory (subcategory may be null)
  // This useMemo MUST be called in every render, regardless of loading/error states
  const grouped = useMemo(() => {
    try {
      if (!skills || !Array.isArray(skills)) {
        return {};
      }
      const result = {};
      skills.forEach((skill) => {
        if (!skill) return; // Skip null/undefined skills
        const main = skill?.main_category?.name || "Uncategorized";
        const sub = skill?.subcategory?.name || null;
        if (!result[main]) result[main] = {};
        if (!result[main][sub]) result[main][sub] = [];
        result[main][sub].push(skill);
      });
      return result;
    } catch (error) {
      console.error("Error in skills grouping useMemo:", error);
      return {};
    }
  }, [skills]);

  if (!skills.length) {
    return (
      <div className="w-full text-center text-gray-400 py-4">
        No skills found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-700 text-gray-100 text-xs sm:text-sm table-fixed">
        <thead>
          <tr className="bg-black">
            <th className="border border-gray-700 px-1 py-2 w-1/5 sm:w-1/6 text-center text-xs sm:text-sm">
              Category
            </th>
            <th className="border border-gray-700 px-1 py-2 w-1/5 sm:w-1/6 text-center text-xs sm:text-sm">
              Subcategory
            </th>
            <th className="border border-gray-700 px-2 py-2 w-3/5 sm:w-2/3 text-center text-xs sm:text-sm">
              Technologies
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([main, subcats], i) => {
            const subcatNames = Object.keys(subcats);
            return subcatNames.map((sub, j) => {
              const skillsArr = subcats[sub];
              return (
                <tr key={main + (sub || "none")}>
                  {j === 0 && (
                    <td
                      rowSpan={subcatNames.length}
                      className="border border-gray-700 px-1 py-2 font-bold bg-black whitespace-nowrap text-xs sm:text-sm text-center align-middle"
                    >
                      <span className="block sm:hidden text-xs leading-tight">
                        {main.split(" ").map((word, idx) => (
                          <span key={idx} className="block">
                            {word}
                          </span>
                        ))}
                      </span>
                      <span className="hidden sm:block">{main}</span>
                    </td>
                  )}
                  {/* Only show subcategory cell if subcategory exists, else empty cell */}
                  {skillsArr[0]?.subcategory?.name ? (
                    <td className="border border-gray-700 px-1 py-2 bg-black whitespace-nowrap text-xs sm:text-sm text-center">
                      <span className="block sm:hidden text-xs leading-tight">
                        {skillsArr[0].subcategory.name
                          .split(" ")
                          .map((word, idx) => (
                            <span key={idx} className="block">
                              {word}
                            </span>
                          ))}
                      </span>
                      <span className="hidden sm:block">
                        {skillsArr[0].subcategory.name}
                      </span>
                    </td>
                  ) : (
                    <td className="border border-gray-700 px-1 py-2 bg-black whitespace-nowrap text-xs sm:text-sm text-center"></td>
                  )}
                  <td className="border border-gray-700 px-2 py-3 bg-black">
                    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                      {skillsArr && skillsArr.length > 0
                        ? skillsArr.map((skill) =>
                            skill ? (
                              <SkillIcon
                                key={skill?.id || Math.random()}
                                skill={skill}
                              />
                            ) : null
                          )
                        : null}
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

  // Safe guard for undefined skill
  if (!skill) {
    return null;
  }

  return (
    <a
      href={skill?.doc_link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group hover:text-indigo-400 transition"
    >
      {skill?.icon_url && !imgError ? (
        <img
          src={skill.icon_url}
          alt={skill?.name || "Skill icon"}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
          onError={handleImgError}
        />
      ) : (
        <span className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-500 text-sm sm:text-base md:text-lg">
          ?
        </span>
      )}
      <span className="text-xs text-center group-hover:underline mt-1 leading-tight max-w-16 sm:max-w-20">
        {skill?.name || "Unknown"}
      </span>
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
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/projects/`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setProjects(Array.isArray(data) ? data : []);
          }
        } else {
          if (isMounted) {
            setError(
              `Failed to fetch projects: ${response.status} ${response.statusText}`
            );
            setProjects([]);
          }
        }
      } catch (error) {
        console.error("Projects fetch error:", error);
        if (isMounted) {
          setError(`Network error: ${error.message}`);
          setProjects([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = useMemo(() => {
    try {
      if (!projects || !Array.isArray(projects)) {
        return [];
      }
      return projects.filter((p) => p && p.featured);
    } catch (error) {
      console.error("Error in featuredProjects useMemo:", error);
      return [];
    }
  }, [projects]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span>{" "}
        <span>Loading...</span>
      </div>
    );
  }
  if (error) {
    return <div className="w-full text-center text-red-400 py-4">{error}</div>;
  }
  if (!featuredProjects.length) {
    return (
      <div className="w-full text-center text-gray-400 py-4">
        No featured projects found.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project) => (
        <ProjectCard key={project?.id || Math.random()} project={project} />
      ))}
    </div>
  );
}
