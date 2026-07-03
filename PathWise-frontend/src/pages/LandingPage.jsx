import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import WhoWeHelpSection from '../components/WhoWeHelpSection';
import TestimonialsSection from '../components/TestimonialsSection';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <WhoWeHelpSection />
      <TestimonialsSection />

      <section id="resources" className="bg-paper py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-ink text-4xl md:text-5xl font-medium leading-tight">
            Your path is waiting to be mapped.
          </h2>
          <p className="mt-5 text-ink-soft text-lg max-w-lg mx-auto">
            No account, no waiting. Tell us who you are and where you're
            starting from &mdash; we'll take it from there.
          </p>
          <button
            onClick={() => navigate('/begin')}
            className="mt-9 bg-forest hover:bg-forest-dark text-paper px-8 py-4 rounded-full font-medium text-lg transition-colors"
          >
            Get started, free
          </button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
