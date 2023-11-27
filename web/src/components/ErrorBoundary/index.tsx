import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Code,
  Container,
  Flex,
} from '@chakra-ui/react';
import React, { type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error);

    this.setState({
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Container mt={10} maxW="container.lg">
          <Alert status="error" flexDirection="column" alignItems="left" rounded="md">
            <Flex direction="row" mb={4}>
              <AlertIcon />
              <AlertTitle>An Error Occurred</AlertTitle>
            </Flex>

            <AlertDescription>
              <Code
                display="block"
                whiteSpace="pre"
                fontSize="xs"
                overflow="auto"
                maxH="400px"
                rounded="md"
                px={2}
                py={1}
              >
                {error?.message}
                {errorInfo?.componentStack?.toString()}
              </Code>
            </AlertDescription>
          </Alert>
        </Container>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
