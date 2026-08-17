import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Top-level boundary so a single component crash doesn't white-screen the
 * whole site. Logs the error and renders a friendly fallback with a reload
 * action.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="grid min-h-screen place-items-center bg-white dark:bg-slate-900 px-4 transition-colors">
        <div className="max-w-md rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
          <h1 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">
            An unexpected error broke this page. Reloading usually fixes it.
            If it keeps happening, please contact us.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition shadow-sm"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
