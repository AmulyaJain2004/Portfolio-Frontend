import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const Blog = React.lazy(() => import("./pages/Blog"));
const DailyLog = React.lazy(() => import("./pages/DailyLog"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AllProjects = React.lazy(() => import("./pages/AllProjects"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center py-8">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span>{" "}
              <span>Loading...</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/daily-logs" element={<DailyLog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center text-2xl text-gray-400">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
