import { Component, ReactNode, ErrorInfo } from "react";
import styles from "./errorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.imageoverlay}>
          <div className={styles.imagecontainer}></div>
          <div className={styles.imagetext}>
            An Error occured. Refresh to continue
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
