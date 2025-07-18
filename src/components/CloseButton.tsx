import React from "react";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClick, className = "", ariaLabel = "Cerrar" }, ref) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      ref={ref}
      className={`
        absolute top-7 left-7 z-10
        flex items-center justify-center
        w-8 h-8 rounded-full
        bg-white/90 shadow-md
        hover:bg-white
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-[#a1583c]
        cursor-pointer
        ${className}
      `}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#a1583c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="4" y1="4" x2="14" y2="14" />
        <line x1="14" y1="4" x2="4" y2="14" />
      </svg>
    </button>
  )
);

CloseButton.displayName = "CloseButton";

export default CloseButton; 