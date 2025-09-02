import React, { FunctionComponent } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { AlertTriangleIcon } from "lucide-react-native";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  ControlsComponent?: FunctionComponent<{ onResetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box className="flex-1 bg-background-300 justify-center items-center px-8">
          <Box className="bg-background-0 rounded-2xl p-8 max-w-sm w-full shadow-soft-1 border border-border-200">
            <Box className="items-center mb-6">
              <Box className="bg-error-50 rounded-full p-4 mb-4">
                <AlertTriangleIcon color="#ef4444" size={32} />
              </Box>
              <Text className="text-xl font-bold text-typography-900 mb-2 text-center">
                Oops! Something went wrong
              </Text>
              <Text className="text-sm text-typography-600 text-center leading-5">
                We're sorry, but something unexpected happened. The app
                encountered an error and couldn't continue.
              </Text>
              {this.state.error && __DEV__ && (
                <Box className="bg-background-100 rounded-xl p-4 w-full mt-4">
                  <Text className="text-xs text-typography-500 font-mono">
                    {this.state.error.message}
                  </Text>
                </Box>
              )}
            </Box>

            {this.props.ControlsComponent && (
              <this.props.ControlsComponent onResetError={this.resetError} />
            )}
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
