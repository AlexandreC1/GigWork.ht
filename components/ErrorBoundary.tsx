import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="max-w-xl mx-auto my-12 bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-brand-dark mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => {
              this.handleReset();
              window.location.hash = '#/';
            }}
            className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
