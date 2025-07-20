import React, { useState, useEffect } from "react";

const BlogTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results = [];

      // Test 1: Direct fetch to index.json
      try {
        console.log("Testing fetch to /blogs/index.json");
        const response = await fetch("/blogs/index.json");
        results.push({
          test: "Fetch /blogs/index.json",
          status: response.status,
          ok: response.ok,
          url: response.url,
          data: response.ok ? await response.json() : null,
        });
      } catch (error) {
        results.push({
          test: "Fetch /blogs/index.json",
          error: error.message,
        });
      }

      // Test 2: Try absolute path
      try {
        console.log("Testing fetch to ./blogs/index.json");
        const response = await fetch("./blogs/index.json");
        results.push({
          test: "Fetch ./blogs/index.json",
          status: response.status,
          ok: response.ok,
          url: response.url,
          data: response.ok ? await response.json() : null,
        });
      } catch (error) {
        results.push({
          test: "Fetch ./blogs/index.json",
          error: error.message,
        });
      }

      setTestResults(results);
      setLoading(false);
    };

    runTests();
  }, []);

  if (loading) return <div>Running network tests...</div>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2>Blog Network Tests</h2>
      {testResults.map((result, index) => (
        <div key={index} className="mb-4 p-2 border border-gray-600">
          <h3 className="font-bold">{result.test}</h3>
          {result.error && (
            <p className="text-red-400">Error: {result.error}</p>
          )}
          {result.status && (
            <p>
              Status: {result.status} ({result.ok ? "OK" : "Not OK"})
            </p>
          )}
          {result.url && <p>URL: {result.url}</p>}
          {result.data && (
            <div>
              <p>
                Data Length:{" "}
                {Array.isArray(result.data) ? result.data.length : "Not Array"}
              </p>
              <pre className="text-xs bg-gray-800 p-2 mt-2">
                {JSON.stringify(result.data, null, 2).substring(0, 500)}...
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogTest;
