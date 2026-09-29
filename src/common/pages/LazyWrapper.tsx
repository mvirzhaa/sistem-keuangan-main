import { Suspense, type JSX } from "react";
import PageLoader from "./PageLoader";

// Wrapper untuk lazy-loaded components
export const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};
