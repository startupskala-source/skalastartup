import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText = ({ text, className = "", delay = 0 }: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <span
            className={`inline-block transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            style={{ transitionDelay: `${wordIndex * 80}ms` }}
          >
            {word}
            {wordIndex < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
};

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedLetters = ({ text, className = "", delay = 0 }: AnimatedLettersProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: `${index * 40}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};
