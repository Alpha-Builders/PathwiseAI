import React from 'react';
import { Compass, LineChart, Layers, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Compass,
    chip: 'sage',
    title: 'A path, not a quiz result',
    body: "Tell us your stage and subjects. We map it to real majors and roles, not a single generic label.",
  },
  {
    icon: Layers,
    chip: 'clay',
    title: 'Skills, in order',
    body: 'See exactly which skills matter for your path and the order that actually gets you there fastest.',
  },
  {
    icon: LineChart,
    chip: 'sage',
    title: 'Progress you can see',
    body: 'Track how close you are to your target role, with milestones that update as you grow.',
  },
  {
    icon: Sparkles,
    chip: 'clay',
    title: 'Built with AI, checked by humans',
    body: 'Recommendations are generated with AI and grounded in real career and curriculum data.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="explore" className="bg-paper py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <span className="text-forest font-medium text-sm tracking-wide uppercase">What you get</span>
          <h2 className="font-display text-ink text-4xl md:text-5xl font-medium mt-4 leading-tight">
            Clarity, where there used to be guesswork
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            const chipBg = f.chip === 'sage' ? 'bg-sage-bg' : 'bg-clay-bg';
            const chipFg = f.chip === 'sage' ? 'text-sage-ink' : 'text-clay';
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-card-line bg-card p-8 hover:shadow-[0_8px_30px_-12px_rgba(33,48,31,0.15)] transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${chipBg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${chipFg}`} />
                </div>
                <h3 className="font-display text-xl text-ink font-medium mb-2">{f.title}</h3>
                <p className="text-ink-soft text-[15px] leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
