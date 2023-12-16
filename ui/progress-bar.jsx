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
      className={`fixed right-0 top-0 z-10 w-2 ${theme === 'light' ? 'bg-black' : 'bg-white'}`}
      style={{ height: `${height}%` }}
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
