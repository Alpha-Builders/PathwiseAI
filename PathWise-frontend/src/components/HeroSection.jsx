import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-sage-bg text-sage-ink px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-ink" />
              Built for students figuring it out
            </div>

            <h1 className="font-display text-ink text-5xl md:text-6xl leading-[1.08] font-medium">
              Every career starts
              <br />
              as an unmarked <span className="italic text-forest">trail.</span>
            </h1>

            <p className="mt-7 text-ink-soft text-lg leading-relaxed max-w-md">
              Pathwise AI turns your subjects, interests, and stage of study
              into a clear route forward &mdash; the majors worth considering,
              the skills worth building, and the next right step.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/begin')}
                className="group inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-paper px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                Map my path
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#how-it-works"
                className="text-ink font-medium px-2 py-3.5 border-b border-ink/30 hover:border-ink transition-colors"
              >
                See how it works
              </a>
            </div>

            <div className="mt-14 flex gap-10 text-ink">
              <div>
                <div className="font-display text-3xl font-semibold">12k+</div>
                <div className="text-ink-faint text-sm mt-1">Students guided</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">340+</div>
                <div className="text-ink-faint text-sm mt-1">Mapped career paths</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">4.9/5</div>
                <div className="text-ink-faint text-sm mt-1">Average rating</div>
              </div>
            </div>
          </div>

          {/* Signature: hand-drawn winding trail with waypoints */}
          <div className="relative">
            <svg viewBox="0 0 420 480" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="420" height="480" rx="28" fill="#EFEADC" />
              <path
                d="M70 430 C 70 350, 170 360, 175 290 C 180 220, 90 210, 95 150 C 100 90, 220 100, 230 50"
                stroke="#B4AF87"
                strokeWidth="3"
                strokeDasharray="1 14"
                strokeLinecap="round"
              />
              {/* waypoint 1 */}
              <circle cx="70" cy="430" r="9" fill="#2E4A34" />
              <text x="92" y="435" fontFamily="Inter" fontSize="14" fill="#21301F" fontWeight="600">You are here</text>

              {/* waypoint 2 */}
              <circle cx="175" cy="290" r="9" fill="#3C6B44" />
              <rect x="196" y="264" width="118" height="52" rx="12" fill="#FBF9F2" stroke="#E4DCC5" />
              <text x="210" y="284" fontFamily="Inter" fontSize="11" fill="#8A9080">STEP 02</text>
              <text x="210" y="302" fontFamily="Inter" fontSize="13" fill="#21301F" fontWeight="600">Pick a direction</text>

              {/* waypoint 3 */}
              <circle cx="95" cy="150" r="9" fill="#B4703E" />
              <rect x="18" y="96" width="130" height="52" rx="12" fill="#FBF9F2" stroke="#E4DCC5" />
              <text x="32" y="116" fontFamily="Inter" fontSize="11" fill="#8A9080">STEP 03</text>
              <text x="32" y="134" fontFamily="Inter" fontSize="13" fill="#21301F" fontWeight="600">Build real skills</text>

              {/* waypoint 4 - destination */}
              <circle cx="230" cy="50" r="11" fill="#2E4A34" />
              <circle cx="230" cy="50" r="17" stroke="#2E4A34" strokeWidth="1.5" opacity="0.4" />
              <text x="252" y="55" fontFamily="Inter" fontSize="14" fill="#21301F" fontWeight="700">Your career</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
