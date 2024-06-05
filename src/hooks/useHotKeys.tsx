import { useEffect } from "react";

type UseHotKeysProps = {
  onButtonNext?: () => void;
  onButtonPrev?: () => void;
  onHelpModal?: () => void;
  onFormsPage?: () => void;
  onFinish?: () => void;
};

const useHotKeys = ({
  onButtonNext = () => {},
  onButtonPrev = () => {},
  onHelpModal = () => {},
  onFormsPage = () => {},
  onFinish = () => {},
}: UseHotKeysProps): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onFormsPage();
        return;
      }

      if (event.key === "F9") {
        onFinish();
        return;
      }

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
  }, [onButtonNext, onButtonPrev, onHelpModal, onFormsPage, onFinish]);
};

export default useHotKeys;
