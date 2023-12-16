'use client';

import { useEffect } from 'react';
import { useState } from 'react';

const ProgressBar = () => {
  const [height, setHeight] = useState(() => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const percent = (scrollTop / (scrollHeight - element.clientHeight)) * 100;

    return percent;
  });

  const handleScrollHeight = () => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const percent = (scrollTop / (scrollHeight - element.clientHeight)) * 100;

    setHeight(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollHeight);

    return () => window.removeEventListener('scroll', handleScrollHeight);
  }, []);

  return (
    <div
      style={{
        height: `${height}%`,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 10,
        backgroundColor: 'white',
        width: '8px',
      }}
    ></div>
  );
};

export default ProgressBar;
