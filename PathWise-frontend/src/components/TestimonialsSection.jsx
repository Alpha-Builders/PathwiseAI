import React from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    name: 'Amara O.',
    role: 'High school senior',
    text: "I had four subjects I liked and zero idea what they added up to. Pathwise turned that into an actual shortlist of majors.",
  },
  {
    name: 'Daniel K.',
    role: 'Computer Science, 2nd year',
    text: 'The skills roadmap is the part I keep coming back to. It told me what to learn this term, not just someday.',
  },
  {
    name: 'Feyisayo A.',
    role: 'Career changer',
    text: "Seeing how close I actually was to the role I wanted made the whole switch feel less like a leap of faith.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="community" className="bg-paper-soft py-24 md:py-32 border-y border-card-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="text-forest font-medium text-sm tracking-wide uppercase">From the community</span>
          <h2 className="font-display text-ink text-4xl md:text-5xl font-medium mt-4 leading-tight">
            Students who found their footing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-2xl bg-card border border-card-line p-8 flex flex-col">
              <Quote className="w-7 h-7 text-clay mb-5" />
              <p className="text-ink text-[15px] leading-relaxed flex-1">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-6 pt-6 border-t border-card-line">
                <div className="font-display text-ink font-medium">{q.name}</div>
                <div className="text-ink-faint text-sm">{q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
