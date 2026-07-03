import React from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'Product',
    links: ['Explore paths', 'My paths', 'How it works', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Career library', 'Skill guides', 'Student stories', 'FAQ'],
  },
  {
    title: 'Community',
    links: ['Discord', 'Mentor network', 'Events', 'Blog'],
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-paper-soft border-t border-card-line">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <span className="font-display text-2xl font-semibold text-ink">
            Pathwise <span className="text-forest">AI</span>
          </span>
          <p className="mt-4 text-ink-soft text-[15px] leading-relaxed max-w-xs">
            A personalized, AI-guided map from where you are now to the career you're building toward.
          </p>
          <button
            onClick={() => navigate('/begin')}
            className="mt-6 inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-paper px-5 py-2.5 rounded-full font-medium text-sm transition-colors"
          >
            Start your journey
          </button>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-ink font-medium mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-ink-soft text-sm hover:text-forest transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-card-line">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink-faint">
          <span>&copy; {new Date().getFullYear()} Pathwise AI. Built for the next generation of builders.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-forest transition-colors">Privacy</a>
            <a href="#" className="hover:text-forest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
