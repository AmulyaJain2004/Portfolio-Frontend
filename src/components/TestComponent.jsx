import React, { useState, useEffect, useMemo } from "react";

// Test component to verify the useMemo fix
function TestComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call that might return null/undefined
    setTimeout(() => {
      // This simulates the problematic case
      setProjects(null); // This was causing the error
      setLoading(false);
    }, 1000);
  }, []);

  // This useMemo was the source of error #310
  const featuredProjects = useMemo(() => {
    console.log("Projects type:", typeof projects, "Value:", projects);
    if (!projects || !Array.isArray(projects)) {
      return [];
    }
    return projects.filter((p) => p && p.featured);
  }, [projects]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Test Component</h2>
      <p>Projects: {JSON.stringify(projects)}</p>
      <p>Featured Projects: {JSON.stringify(featuredProjects)}</p>
      <p>Featured Projects Length: {featuredProjects.length}</p>
    </div>
  );
}

export default TestComponent;
