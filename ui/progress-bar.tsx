'use client';

import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [height, setHeight] = useState(0);

  const handleScrollHeight = () => {
    const percent = getScrollYPercent();

    setHeight(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollHeight);

    return () => window.removeEventListener('scroll', handleScrollHeight);
  }, []);

  return (
    <div className="fixed right-0 top-0 z-20 w-1 bg-zinc-500 dark:bg-gray-400" style={{ height: `${height}%` }}></div>
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
