import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (isWaiting) return;

    if (isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length - 1));
      
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)));
      }
    } else {
      setCurrentText(currentWord.substring(0, currentText.length + 1));
      
      if (currentText === currentWord) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          if (loop || currentWordIndex < words.length - 1) {
            setIsDeleting(true);
          }
        }, delayBetweenWords);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, delayBetweenWords, loop]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return { text: currentText, isTyping: !isWaiting };
};
