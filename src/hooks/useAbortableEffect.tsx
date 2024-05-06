/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

type CleanupFunction = () => void;

const useAbortableEffect = (
  effectFunction: (abortController: AbortController) => void,
  deps: any[] = [],
  cleanupFunctions: CleanupFunction[] = [],
) => {
  useEffect(() => {
    const abortController = new AbortController();

    effectFunction(abortController);

    return () => {
      abortController.abort();
      cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useAbortableEffect;
