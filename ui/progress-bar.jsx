'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useState } from 'react';

const ProgressBar = () => {
  const { theme } = useTheme();
  const [height, setHeight] = useState(() => getScrollYPercent());

  const handleScrollHeight = () => {
    const percent = getScrollYPercent();

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
        backgroundColor: theme === 'light' ? 'black' : 'white',
        width: '8px',
      }}
    ></div>
  );
};

function getScrollYPercent() {
  const element = document.documentElement;
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const percent = (scrollTop / (scrollHeight - element.clientHeight)) * 100;

  return percent;
}

export default ProgressBar;
