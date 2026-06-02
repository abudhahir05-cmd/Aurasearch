import React, { useEffect } from 'react';

export const ThemeToggle = () => {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }, []);

  return null;
};
