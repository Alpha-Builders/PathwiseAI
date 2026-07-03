import React from 'react';
import { School, GraduationCap, Compass as CompassIcon } from 'lucide-react';

const groups = [
  {
    icon: School,
    chip: 'sage',
    title: 'High schoolers',
    body: 'Turn favorite subjects into a shortlist of majors and a plan for admissions season.',
  },
  {
    icon: GraduationCap,
    chip: 'clay',
    title: 'College students',
    body: 'Match your course of study to real roles, internships, and the skills employers ask for.',
  },
  {
    icon: CompassIcon,
    chip: 'sage',
    title: 'Anyone rethinking direction',
    body: 'Not sure your current path fits? Get an outside-in view of where your subjects could lead.',
  },
];

export default function WhoWeHelpSection() {
  return (
    <section id="my-paths" className="bg-paper py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="text-forest font-medium text-sm tracking-wide uppercase">Who it's for</span>
          <h2 className="font-display text-ink text-4xl md:text-5xl font-medium mt-4 leading-tight">
            Wherever you're standing, there's a next step
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g) => {
            const Icon = g.icon;
            const chipBg = g.chip === 'sage' ? 'bg-sage-bg' : 'bg-clay-bg';
            const chipFg = g.chip === 'sage' ? 'text-sage-ink' : 'text-clay';
            return (
              <div key={g.title} className="rounded-2xl bg-card border border-card-line p-8">
                <div className={`w-12 h-12 rounded-xl ${chipBg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${chipFg}`} />
                </div>
                <h3 className="font-display text-xl text-ink font-medium mb-2">{g.title}</h3>
                <p className="text-ink-soft text-[15px] leading-relaxed">{g.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
