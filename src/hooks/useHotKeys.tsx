import { useEffect } from "react";

type UseHotKeysProps = {
  onButtonNext?: () => void;
  onButtonPrev?: () => void;
};

const useHotKeys = ({
  onButtonNext = () => {},
  onButtonPrev = () => {},
}: UseHotKeysProps): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (!event.altKey) return;
  
        switch (event.key.toLowerCase()) {
          case 'n':
            event.preventDefault();
            onButtonNext();
            break;
          case 'p':
            event.preventDefault();
            onButtonPrev();
            break;
          default:
            break;
        }
      };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onButtonNext, onButtonPrev]);
};

export default useHotKeys;
