import React from 'react';
import { Check } from 'lucide-react';

// A small "trail" progress indicator used across the onboarding flow.
// step is 1-indexed; steps is an array of labels.
export default function StepTrail({ step, steps }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < step;
        const active = idx === step;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  done
                    ? 'bg-forest text-paper'
                    : active
                    ? 'bg-forest text-paper ring-4 ring-sage-bg'
                    : 'bg-card-line text-ink-faint'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : idx}
              </div>
              <span
                className={`hidden sm:inline text-sm font-medium ${
                  active ? 'text-ink' : 'text-ink-faint'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < steps.length && (
              <div
                className={`w-6 sm:w-10 h-px ${done ? 'bg-forest' : 'bg-card-line'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
