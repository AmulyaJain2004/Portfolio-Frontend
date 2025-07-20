import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../config";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = () => {
      setLoading(true);
      fetch(`${config.apiBaseUrl}/api/projects/`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setProjects(data);
        })
        .catch(() => {
          if (isMounted) setError("Failed to fetch projects.");
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    };
    fetchProjects();
    // Removed setInterval polling
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 px-2 sm:px-0 relative">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-0 flex">
          <div
            className="border-l border-gray-700 h-full"
            style={{ width: 0 }}
          ></div>
          <div className="flex-1"></div>
          <div
            className="border-r border-gray-700 h-full"
            style={{ width: 0 }}
          ></div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-300 mb-8 text-center z-10 relative">
          All Projects
        </h1>
        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center border border-gray-700 bg-black rounded-2xl shadow pt-20 mb-8 relative z-10"
          >
            {loading ? (
              <div className="w-full flex justify-center items-center py-8">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span>{" "}
                <span>Loading...</span>
              </div>
            ) : error ? (
              <div className="w-full text-center text-red-400 py-4">
                {error}
              </div>
            ) : !projects || projects.length === 0 ? (
              <div className="w-full text-center text-gray-400 py-4">
                No projects found.
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) =>
                  project ? (
                    <ProjectCard
                      key={project?.id || Math.random()}
                      project={project}
                    />
                  ) : null
                )}
              </div>
            )}
          </motion.section>
          <div className="my-4 w-full flex justify-center relative z-10">
            <div
              className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2"
              style={{ zIndex: 1 }}
            ></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllProjects;
