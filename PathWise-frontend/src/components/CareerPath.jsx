import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpandProfile } from './ExpandProfile';
import careerPaths from '../data/CareerpathData';

export default function CareerPathPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [paths, setPaths] = useState([]);

  const toggleUnlock = () => setIsProModalOpen(true);
  const closeModal = () => setIsProModalOpen(false);

  const createPageUrl = (pageName) => {
    const pageRoutes = {
      SkillsPage: '/skills',
      CareerPathPage: '/career-path',
      JobRolePage: '/job-roles',
      CourseSelectionPage: '/course-selection',
    };
    return pageRoutes[pageName] || '/';
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const course = urlParams.get('course') || '';
    setSelectedCourse(course);
    if (course) localStorage.setItem('selectedCourse', course);

    if (course && Array.isArray(careerPaths[course]) && careerPaths[course].length > 0) {
      setPaths(careerPaths[course]);
    } else {
      setPaths([]);
    }
  }, [location.search]);

  const handlePathSelect = (pathId) => {
    navigate(createPageUrl('JobRolePage') + `?course=${encodeURIComponent(selectedCourse)}&path=${pathId}`);
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <span className="font-display text-xl font-semibold text-ink">
            Pathwise <span className="text-forest">AI</span>
          </span>
          <ExpandProfile />
        </div>

        <div className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
            Career paths for{' '}
            <span className="text-forest italic">{selectedCourse || '\u2014'}</span>
          </h1>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed">
            Here are the strongest-matching career paths
            {selectedCourse ? ` for ${selectedCourse} graduates` : ''}, ranked by fit.
          </p>
        </div>

        {paths.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-card border border-clay/40 rounded-2xl p-8 text-center mb-12">
            <p className="text-lg font-semibold text-clay">No career paths here yet</p>
            <p className="text-sm text-ink-soft mt-2">
              The selected course "{selectedCourse || 'none'}" doesn&apos;t have any mapped
              career paths yet &mdash; check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paths.map((path) => {
              const IconComponent = path.icon;
              return (
                <div
                  key={path.id}
                  className="group bg-card rounded-3xl border border-card-line p-7 hover:border-forest hover:shadow-[0_14px_40px_-20px_rgba(46,74,52,0.4)] transition-all duration-300"
                >
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-14 h-14 bg-sage-bg rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-7 h-7 text-sage-ink" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-ink mt-1">{path.name}</h3>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed mb-4">{path.description}</p>

                  <button
                    onClick={toggleUnlock}
                    className="mb-4 inline-flex items-center gap-1.5 text-clay text-sm font-medium"
                  >
                    {isUnlocked ? <Eye size={16} /> : <EyeOff size={16} />}
                    {isUnlocked ? 'Metrics unlocked' : 'Unlock this pro feature'}
                  </button>

                  {isUnlocked && (
                    <div className="space-y-2.5 mb-5 rounded-xl bg-paper-soft p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-soft">Available jobs</span>
                        <span className="font-semibold text-clay">{path.jobCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-soft">Salary range</span>
                        <span className="font-semibold text-forest">{path.salaryRange}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-soft">Growth rate</span>
                        <span className="font-semibold text-sage-ink">{path.growth}</span>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="text-xs text-ink-faint tracking-wide uppercase mb-2">Top companies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(path.companies) &&
                        path.companies.slice(0, 3).map((company) => (
                          <span
                            key={company}
                            className="text-xs bg-sage-bg text-sage-ink px-2.5 py-1 rounded-full"
                          >
                            {company}
                          </span>
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePathSelect(path.id)}
                    className="w-full flex items-center justify-between cursor-pointer border-t border-card-line pt-4"
                  >
                    <span className="text-sm font-medium text-forest">Explore roles</span>
                    <div className="border border-forest p-2.5 rounded-full group-hover:bg-forest transition-colors">
                      <ArrowRight className="w-4 h-4 text-forest group-hover:text-paper transition-colors" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate(createPageUrl('CourseSelectionPage'))}
            className="inline-flex items-center gap-2 border border-card-line text-ink-soft hover:border-forest hover:text-forest px-6 py-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to course selection
          </button>
        </div>
      </div>

      {isProModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-ink/60 backdrop-blur-sm z-[9999] px-4">
          <div className="bg-card rounded-2xl flex flex-col justify-center p-8 w-full max-w-md text-center shadow-2xl border border-card-line">
            <h2 className="font-display text-2xl font-medium text-ink mb-3">
              Unlock pro metrics &mdash; ₦2,000
            </h2>
            <p className="text-ink-soft text-sm mb-4">Unlock access to premium insights:</p>
            <ul className="text-left text-ink-soft text-sm mb-6 space-y-2">
              <li>&bull; Real-life job metrics</li>
              <li>&bull; Mentorship access</li>
              <li>&bull; AI-guided skill learning paths</li>
              <li>&bull; Career growth analysis</li>
            </ul>
            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-paper-soft rounded-full text-ink-soft font-medium text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsUnlocked(true);
                  closeModal();
                }}
                className="px-5 py-2.5 bg-clay text-paper rounded-full font-medium text-sm"
              >
                Subscribe now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
