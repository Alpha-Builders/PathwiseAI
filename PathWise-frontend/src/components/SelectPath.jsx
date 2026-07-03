import React, { useEffect, useState } from 'react';
import { School, Building2, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepTrail from './StepTrail';

const highSchoolPoints = [
  'College admissions tracker',
  'Career path exploration',
  'Portfolio building',
];

const collegePoints = [
  'Major & industry alignment',
  'The industry bridge program',
  'Resume & interview prep',
];

const SelectPath = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('firstName');
    if (!name) {
      navigate('/begin');
      return;
    }
    setFirstName(name);
  }, [navigate]);

  const handleContinue = () => {
    if (!selectedPath) return;
    localStorage.setItem('academicStage', selectedPath);
    if (selectedPath === 'high-school') {
      navigate('/highschool-path');
    } else {
      navigate('/course-selection');
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-grain absolute inset-0 opacity-40 pointer-events-none" />

      <header className="relative px-6 py-6 flex justify-center">
        <span className="font-display text-xl font-semibold text-ink">
          Pathwise <span className="text-forest">AI</span>
        </span>
      </header>

      <div className="relative px-6 pt-4">
        <StepTrail step={2} steps={['You', 'Path', 'Course']} />
      </div>

      <main className="relative max-w-5xl mx-auto px-6 pt-14 pb-24">
        <div className="text-center mb-14">
          <h1 className="font-display text-ink text-4xl md:text-5xl font-medium leading-tight">
            Where does your journey begin{firstName ? `, ${firstName}` : ''}?
          </h1>
          <p className="mt-4 text-ink-soft text-lg max-w-xl mx-auto">
            Select the path that matches your current stage. We'll tailor
            your AI-guided roadmap to help you navigate your unique
            educational landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* High School */}
          <button
            onClick={() => setSelectedPath('high-school')}
            className={`text-left rounded-2xl p-8 border-2 transition-all bg-card ${
              selectedPath === 'high-school'
                ? 'border-forest shadow-[0_10px_35px_-15px_rgba(46,74,52,0.45)]'
                : 'border-card-line hover:border-sage'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-sage-bg flex items-center justify-center mb-6">
                <School className="w-7 h-7 text-sage-ink" />
              </div>
              {selectedPath === 'high-school' && (
                <span className="w-7 h-7 rounded-full bg-forest flex items-center justify-center">
                  <Check className="w-4 h-4 text-paper" />
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl text-ink font-medium mb-2">High School</h3>
            <p className="text-ink-soft text-[15px] leading-relaxed mb-6">
              Prepare for the next big step. Focused on college admissions
              strategy, extracurricular planning, and discovering your future
              career interests.
            </p>
            <ul className="space-y-2.5 mb-6">
              {highSchoolPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
                  <Check className="w-4 h-4 text-sage-ink shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1.5 text-forest font-medium text-sm">
              Explore High School path <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* College */}
          <button
            onClick={() => setSelectedPath('college')}
            className={`text-left rounded-2xl p-8 border-2 transition-all bg-card ${
              selectedPath === 'college'
                ? 'border-forest shadow-[0_10px_35px_-15px_rgba(46,74,52,0.45)]'
                : 'border-card-line hover:border-clay'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-clay-bg flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-clay" />
              </div>
              {selectedPath === 'college' && (
                <span className="w-7 h-7 rounded-full bg-forest flex items-center justify-center">
                  <Check className="w-4 h-4 text-paper" />
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl text-ink font-medium mb-2">College</h3>
            <p className="text-ink-soft text-[15px] leading-relaxed mb-6">
              Bridge the gap between academics and industry. Focused on major
              selection, internship placement, and professional networking.
            </p>
            <ul className="space-y-2.5 mb-6">
              {collegePoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
                  <Check className="w-4 h-4 text-clay shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1.5 text-forest font-medium text-sm">
              Explore College path <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center mt-14">
          <button
            onClick={handleContinue}
            disabled={!selectedPath}
            className={`px-10 py-4 rounded-full font-medium text-lg transition-all ${
              selectedPath
                ? 'bg-forest hover:bg-forest-dark text-paper'
                : 'bg-card-line text-ink-faint cursor-not-allowed'
            }`}
          >
            Continue
          </button>
          <p className="text-ink-faint text-sm mt-5">
            Not sure? You can change your path later in settings.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SelectPath;
