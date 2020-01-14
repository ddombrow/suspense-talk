import React from "react";

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() {
    // log the error to the server
  }

  render() {
    return this.state.error ? (
      <div>
        There was an error. Please reload.
        <pre style={{ whiteSpace: "normal" }}>{this.state.error.message}</pre>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
