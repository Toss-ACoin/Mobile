import debounce from "lodash/debounce";
import { useMemo } from "react";
import { useEvent } from "./useEvent";

export const useDebounce = (callback, delay) => {
  const callbackMemoized = useEvent(callback);

  return useMemo(
    () => debounce(callbackMemoized, delay),
    [callbackMemoized, delay]
  );
};
