import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ExpandProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const boxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const first = localStorage.getItem('firstName') || '';
    const last = localStorage.getItem('lastName') || '';
    setName(`${first} ${last}`.trim());
    setCourse(localStorage.getItem('selectedCourse') || '');
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startOver = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-11 h-11 rounded-full bg-sage-bg hover:bg-sage/40 flex items-center justify-center transition-colors"
      >
        <User className="w-5 h-5 text-sage-ink" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={boxRef}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-14 right-0 z-50 w-64 bg-card border border-card-line shadow-xl rounded-2xl p-5"
          >
            <p className="font-display text-ink font-medium text-lg">{name || 'Guest'}</p>
            {course && (
              <p className="mt-1 text-sm text-ink-soft">
                <span className="text-ink-faint">Studying:</span> {course}
              </p>
            )}
            <button
              onClick={startOver}
              className="mt-4 w-full rounded-full border border-card-line hover:border-forest hover:text-forest text-ink-soft font-medium text-sm py-2.5 transition-colors"
            >
              Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
