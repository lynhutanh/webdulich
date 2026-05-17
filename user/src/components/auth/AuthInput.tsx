import React from 'react';

const inputBase =
  'w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition duration-200';

interface AuthInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  leftIcon: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

export function AuthInput({ label, leftIcon, rightElement, id, error, ...props }: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/60 mb-1.5 font-body">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
          {leftIcon}
        </span>
        <input id={id} className={`${inputBase} ${rightElement ? 'pr-11' : ''}`} {...props} />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 cursor-pointer hover:text-white/50">
            {rightElement}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
