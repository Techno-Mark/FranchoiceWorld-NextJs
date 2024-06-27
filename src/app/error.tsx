"use client";
const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <>
      <div>{error.message}</div>
      <button onClick={reset}>Try again</button>
    </>
  );
};

export default ErrorBoundary;
