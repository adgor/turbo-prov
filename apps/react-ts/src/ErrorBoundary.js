import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5555);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          there was an error <br />
          <Link to="/">Click here</Link> to go back to the homapage.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
