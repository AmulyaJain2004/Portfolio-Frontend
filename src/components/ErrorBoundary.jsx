import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-100 p-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              We encountered an unexpected error. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                  Show Error Details (Development Mode)
                </summary>
                <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700 text-sm">
                  <pre className="whitespace-pre-wrap text-red-300">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  <pre className="whitespace-pre-wrap text-gray-400 mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
