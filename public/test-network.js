// Simple network test
console.log("🧪 Testing network connectivity...");

// Test 1: Direct fetch
fetch("http://localhost:8000/api/skills/")
  .then((response) => {
    console.log(
      "✅ Direct fetch response:",
      response.status,
      response.statusText
    );
    return response.json();
  })
  .then((data) => {
    console.log("✅ Direct fetch data:", data);
  })
  .catch((error) => {
    console.error("❌ Direct fetch error:", error);
  });

// Test 2: Check CORS
fetch("http://localhost:8000/api/skills/", {
  method: "OPTIONS",
})
  .then((response) => {
    console.log("🔧 CORS preflight response:", response.status);
    console.log("🔧 CORS headers:", {
      "Access-Control-Allow-Origin": response.headers.get(
        "Access-Control-Allow-Origin"
      ),
      "Access-Control-Allow-Methods": response.headers.get(
        "Access-Control-Allow-Methods"
      ),
      "Access-Control-Allow-Headers": response.headers.get(
        "Access-Control-Allow-Headers"
      ),
    });
  })
  .catch((error) => {
    console.error("❌ CORS preflight error:", error);
  });
