import React from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    n: '01',
    title: 'Tell us where you\u2019re starting from',
    body: 'Your name, and whether you\u2019re in high school or already in college.',
  },
  {
    n: '02',
    title: 'Point at what you study',
    body: 'Pick the subject or course closest to your world right now \u2014 no wrong answers.',
  },
  {
    n: '03',
    title: 'Get your route forward',
    body: 'Pathwise lays out matching careers, the skills to build, and a realistic order to build them in.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section id="how-it-works" className="bg-paper-soft py-24 md:py-32 border-y border-card-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="text-forest font-medium text-sm tracking-wide uppercase">How it works</span>
          <h2 className="font-display text-ink text-4xl md:text-5xl font-medium mt-4 leading-tight">
            Three steps. About two minutes.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="font-display text-6xl text-card-line font-semibold select-none">{s.n}</div>
              <h3 className="font-display text-xl text-ink font-medium mt-3 mb-2">{s.title}</h3>
              <p className="text-ink-soft text-[15px] leading-relaxed">{s.body}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-[-1.25rem] w-6 border-t border-dashed border-card-line" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/begin')}
          className="mt-16 bg-forest hover:bg-forest-dark text-paper px-7 py-3.5 rounded-full font-medium transition-colors"
        >
          Start step one
        </button>
      </div>
    </section>
  );
}
