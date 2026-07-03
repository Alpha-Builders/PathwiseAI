import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StepTrail from '../components/StepTrail';

const Onboarding = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValid = firstName.trim().length > 1 && lastName.trim().length > 1 && emailValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    const formattedFirst =
      firstName.trim().charAt(0).toUpperCase() + firstName.trim().slice(1).toLowerCase();
    const formattedLast =
      lastName.trim().charAt(0).toUpperCase() + lastName.trim().slice(1).toLowerCase();

    localStorage.setItem('firstName', formattedFirst);
    localStorage.setItem('lastName', formattedLast);
    localStorage.setItem('email', email.trim());
    localStorage.setItem(
      'user',
      JSON.stringify({ firstName: formattedFirst, lastName: formattedLast, email: email.trim() })
    );

    navigate('/select-path');
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <div className="bg-grain absolute inset-0 opacity-50 pointer-events-none" />

      <header className="relative px-6 py-6 flex justify-center">
        <span className="font-display text-xl font-semibold text-ink">
          Pathwise <span className="text-forest">AI</span>
        </span>
      </header>

      <div className="relative px-6 pt-4">
        <StepTrail step={1} steps={['You', 'Path', 'Course']} />
      </div>

      <main className="relative flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-ink font-medium leading-tight">
              First, who's mapping
              <br /> their path today?
            </h1>
            <p className="mt-4 text-ink-soft">
              We'll use this to personalize everything from here on out.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-card border border-card-line rounded-2xl p-8 shadow-[0_8px_30px_-14px_rgba(33,48,31,0.2)]"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-ink mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enoch"
                  className="w-full rounded-xl border border-card-line bg-paper px-4 py-3 text-ink placeholder-ink-faint outline-none focus:border-forest transition-colors"
                />
                {touched && firstName.trim().length <= 1 && (
                  <p className="text-clay text-xs mt-1.5">Enter your first name</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-ink mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Adebayo"
                  className="w-full rounded-xl border border-card-line bg-paper px-4 py-3 text-ink placeholder-ink-faint outline-none focus:border-forest transition-colors"
                />
                {touched && lastName.trim().length <= 1 && (
                  <p className="text-clay text-xs mt-1.5">Enter your last name</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enoch@example.com"
                className="w-full rounded-xl border border-card-line bg-paper px-4 py-3 text-ink placeholder-ink-faint outline-none focus:border-forest transition-colors"
              />
              {touched && !emailValid && (
                <p className="text-clay text-xs mt-1.5">Enter a valid email address</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-8 w-full group flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-paper py-3.5 rounded-full font-medium transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-center text-ink-faint text-xs mt-6">
            No password needed &mdash; just jump straight in.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
