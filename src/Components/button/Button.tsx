"use client";

import React, { useRef, useState } from 'react';

// 1. Define component interface for type safety (TypeScript enhancement)
interface MaterialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// Global variable for the animation duration (for synchronization with CSS)
const RIPPLE_DURATION = 600; // ms

/**
 * A reusable, optimized button component simulating the Material Design ripple click effect
 * using only React, Tailwind CSS, and embedded CSS keyframes. No external UI library is used.
 */
export default function MaterialButton({ 
  children, 
  onClick, 
  className = '', 
  ...restProps 
}: MaterialButtonProps): JSX.Element {
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<any[]>([]); // Using 'any' for ripple object keys to keep complexity low
  
  // Clean, consolidated Tailwind classes (no internal comments)
  const baseClasses = `bg-blue-700
  `;

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button = buttonRef.current;
    if (!button) return;

    // Execute original click handler before generating ripple
    if (onClick) {
      onClick(event);
    }
    
    // Calculate the size and position of the ripple
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2; 
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      key: Date.now(),
      size: size,
      x: x - size / 2, // Center ripple at click point
      y: y - size / 2,
    };

    // Add the new ripple to the state
    setRipples(prevRipples => [...prevRipples, newRipple]);

    // Clean up: Remove the ripple element after the animation finishes
    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.key !== newRipple.key));
    }, RIPPLE_DURATION); 
  };

  return (
    <>
      {/* 2. Embedded CSS for the Keyframe Animation */}
      <style>
        {`
        @keyframes ripple-animation {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        .ripple-span {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            opacity: 0.6;
            background-color: rgba(255, 255, 255, 0.5); 
            animation: ripple-animation ${RIPPLE_DURATION}ms linear;
            pointer-events: none;
            z-index: 10;
        }
        /* Style override for light-colored or outlined buttons */
        .border:not(.bg-transparent) .ripple-span {
            background-color: rgba(0, 0, 0, 0.1);
        }
        `}
      </style>

      <button
        ref={buttonRef}
        onClick={createRipple}
        className={`${baseClasses} ${className}`}
        {...restProps} // Pass through any standard button attributes (like 'disabled')
      >
        {/* Children content (relative z-20 to ensure it's above the ripple) */}
        <span className="relative z-20">{children}</span> 

        {/* Dynamic Ripple Elements */}
        {ripples.map(ripple => (
          <span
            key={ripple.key}
            className="ripple-span"
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          />
        ))}
        Click Here
      </button>
    </>
  );
}
