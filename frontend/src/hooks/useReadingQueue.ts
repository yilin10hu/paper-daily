import { useState } from 'react';
import type { Paper } from '../types/data';

const KEY = 'paper-daily:reading-queue:v1';
export const paperKey = (paper: Paper): string => paper.paperUrl || paper.title;

export function useReadingQueue() {
  const [persistent, setPersistent] = useState(true);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
    } catch { return []; }
  });
  function toggle(paper: Paper) {
    const key = paperKey(paper);
    const next = saved.includes(key) ? saved.filter(item => item !== key) : [...saved, key];
    setSaved(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); setPersistent(true); }
    catch { setPersistent(false); }
  }
  return { saved, toggle, persistent };
}
