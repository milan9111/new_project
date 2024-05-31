import { useEffect } from "react";

type UseHotKeysProps = {
  onButtonNext?: () => void;
  onButtonPrev?: () => void;
  onHelpModal?: () => void;
};

const useHotKeys = ({
  onButtonNext = () => {},
  onButtonPrev = () => {},
  onHelpModal = () => {},
}: UseHotKeysProps): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) return;

      switch (event.key.toLowerCase()) {
        case "n":
          event.preventDefault();
          onButtonNext();
          break;
        case "p":
          event.preventDefault();
          onButtonPrev();
          break;
        case "w":
          event.preventDefault();
          onHelpModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onButtonNext, onButtonPrev, onHelpModal]);
};

export default useHotKeys;
