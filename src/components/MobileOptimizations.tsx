'use client';

import { useEffect, useState } from 'react';

interface TouchOptimizationProps {
  children: React.ReactNode;
  className?: string;
}

export default function TouchOptimization({ children, className = '' }: TouchOptimizationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
  if (typeof window === 'undefined') return;
  setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
    return () => {};
  }, []);

  // Add mobile-specific optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on input focus for iOS
  if (typeof document === 'undefined') return;
  const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        );
      }

      // Add touch-specific styles
      if (typeof document !== 'undefined') {
        document.body.style.touchAction = 'manipulation';
        (document.body.style as any).webkitTouchCallout = 'none';
        (document.body.style as any).webkitUserSelect = 'none';
        (document.body.style as any).webkitTapHighlightColor = 'transparent';
      }
    }

    return () => {
      if (isMobile) {
  if (typeof document === 'undefined') return;
  const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
          metaViewport.setAttribute('content', 
            'width=device-width, initial-scale=1, viewport-fit=cover'
          );
        }
      }
    };
  }, [isMobile]);

  return (
    <div className={`${className} ${isMobile ? 'mobile-optimized' : ''}`}>
      {children}
    </div>
  );
}

// Custom hook for touch gestures
export function useTouchGestures() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouch(true);
    const handleMouseDown = () => setIsTouch(false);

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return { isTouch };
}

// Mobile-friendly button component
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export function MobileButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props 
}: MobileButtonProps) {
  const baseClasses = 'touch-target transition-all duration-200 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

// Mobile-friendly input component
interface MobileInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  className?: string;
  disabled?: boolean;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'email';
}

export function MobileInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
  inputMode,
  ...props
}: MobileInputProps) {
  const baseClasses = 'w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-target disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      inputMode={inputMode || (type === 'number' ? 'decimal' : 'text')}
      {...props}
    />
  );
}

// Mobile-friendly select component
interface MobileSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; group?: string }>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function MobileSelect({
  value,
  onChange,
  options,
  className = '',
  disabled = false,
  placeholder,
  ...props
}: MobileSelectProps) {
  const baseClasses = 'w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-target disabled:opacity-50 disabled:cursor-not-allowed bg-white';

  // Group options if they have group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {Object.entries(groupedOptions).map(([group, groupOptions]) => (
        group === 'default' ? (
          groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <optgroup key={group} label={group}>
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        )
      ))}
    </select>
  );
}