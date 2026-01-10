'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  words,
  loop = true,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
  cursorClassName = '',
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && text === currentWord) {
          // Word complete, pause then start deleting
          if (loop || wordIndex < words.length - 1) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else if (isDeleting && text === '') {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        } else if (isDeleting) {
          // Continue deleting
          setText(currentWord.substring(0, text.length - 1));
        } else {
          // Continue typing
          setText(currentWord.substring(0, text.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, loop, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {text}
      <span
        className={`inline-block w-0.5 h-[1em] bg-current ml-1 align-middle ${cursorClassName} ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
      />
    </span>
  );
}
