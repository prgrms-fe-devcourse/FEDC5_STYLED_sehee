/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';

const useIsTyping = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const element = inputRef.current as HTMLInputElement | null;
    if (!element) return;

    let typingTimer: NodeJS.Timeout;

    const handleTyping = () => {
      clearTimeout(typingTimer);
      setIsTyping(true);

      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1000); // 타자 입력이 멈추고 1초 후에 setIsTyping(false) 호출
    };

    element.addEventListener('input', handleTyping);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      element.removeEventListener('input', handleTyping);
      clearTimeout(typingTimer);
    };
  }, []);

  return { inputRef, isTyping, setIsTyping };
};

export default useIsTyping;
