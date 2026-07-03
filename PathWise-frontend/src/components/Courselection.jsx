import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepTrail from './StepTrail';

const courses = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Law',
  'Economics',
  'Business Administration',
  'Accounting',
  'Finance',
  'Marketing',
  'Mass Communication',
  'Political Science',
  'International Relations',
  'Medicine',
  'Nursing',
  'Pharmacy',
  'Engineering (Civil)',
  'Engineering (Mechanical)',
  'Engineering (Electrical)',
  'Architecture',
  'Psychology',
  'Sociology',
  'English Language',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
];

const popularCourses = [
  { name: 'Computer Science', icon: '\u{1F4BB}' },
  { name: 'Law', icon: '\u2696\uFE0F' },
  { name: 'Economics', icon: '\u{1F4C8}' },
  { name: 'Business Administration', icon: '\u{1F4BC}' },
  { name: 'Medicine', icon: '\u{1FA7A}' },
  { name: 'Psychology', icon: '\u{1F9E0}' },
];

export const Courselection = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('firstName');
    if (!name) {
      navigate('/begin');
      return;
    }
    setFirstName(name);
  }, [navigate]);

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCourse) {
      navigate(`/career-path?course=${encodeURIComponent(selectedCourse)}`);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSearchTerm(course);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-grain absolute inset-0 opacity-40 pointer-events-none" />

      <header className="relative px-6 py-6 flex flex-col items-center gap-1">
        <span className="font-display text-xl font-semibold text-ink">
          Pathwise <span className="text-forest">AI</span>
        </span>
        {firstName && (
          <span className="text-ink-soft text-sm">
            Hiya, <span className="text-forest font-medium">{firstName}</span> — let's find your course.
          </span>
        )}
      </header>

      <div className="relative px-6 pt-4">
        <StepTrail step={3} steps={['You', 'Path', 'Course']} />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 pt-14 pb-24">
        <div className="text-center mb-12">
          <h1 className="font-display text-ink text-4xl md:text-5xl font-medium leading-tight">
            Discover your future
          </h1>
          <p className="mt-4 text-ink-soft text-lg max-w-xl mx-auto">
            What course are you studying, or did you study? We'll use it to
            map your closest-matching careers.
          </p>
        </div>

        <div className="bg-card border border-card-line rounded-2xl p-6 md:p-10 shadow-[0_10px_35px_-18px_rgba(33,48,31,0.25)]">
          <div className="relative" ref={dropdownRef}>
            <div className="relative rounded-full border border-card-line bg-paper focus-within:border-forest transition-colors">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-forest w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your course..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="pl-14 pr-14 py-4 text-base rounded-full bg-transparent w-full text-ink placeholder-ink-faint outline-none"
              />
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-ink-faint w-5 h-5" />
            </div>

            {isDropdownOpen && (
              <div className="absolute w-full mt-3 rounded-2xl shadow-xl max-h-72 overflow-y-auto bg-card border border-card-line z-20">
                {filteredCourses.map((course) => (
                  <button
                    key={course}
                    onClick={() => handleCourseSelect(course)}
                    className="w-full text-left px-6 py-3.5 hover:bg-sage-bg/60 first:rounded-t-2xl last:rounded-b-2xl transition-colors border-b border-card-line last:border-b-0 text-ink"
                  >
                    {course}
                  </button>
                ))}
                {filteredCourses.length === 0 && (
                  <div className="px-6 py-4 text-ink-faint text-center">
                    No courses found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedCourse && (
            <div className="mt-8 rounded-2xl p-5 bg-sage-bg/50 border border-sage flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sage-bg flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-sage-ink" />
              </div>
              <div>
                <p className="text-sm text-sage-ink font-medium mb-0.5">Selected course</p>
                <p className="text-lg font-semibold text-ink">{selectedCourse}</p>
              </div>
            </div>
          )}

          {selectedCourse && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleContinue}
                className="group inline-flex items-center gap-2 px-9 py-3.5 bg-forest hover:bg-forest-dark text-paper rounded-full font-medium transition-colors"
              >
                Continue to career paths
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-14">
          <h4 className="text-center text-ink font-display text-xl font-medium mb-8">
            Popular courses
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {popularCourses.map((course) => (
              <button
                key={course.name}
                onClick={() => handleCourseSelect(course.name)}
                className={`rounded-2xl border p-5 text-center transition-all hover:-translate-y-0.5 bg-card ${
                  selectedCourse === course.name
                    ? 'border-forest shadow-[0_8px_25px_-14px_rgba(46,74,52,0.5)]'
                    : 'border-card-line hover:border-sage'
                }`}
              >
                <div className="text-3xl mb-2">{course.icon}</div>
                <div className="text-ink font-medium text-sm">{course.name}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
