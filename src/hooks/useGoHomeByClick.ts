import { useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';


const useGoHomeByClick = (): (() => void) => {
  const navigate: NavigateFunction = useNavigate();

  return useCallback((): void => {
    navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGoHomeByClick;
