interface VettoLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function VettoLogo({ className = "h-8 w-8", iconOnly = false }: VettoLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Emerald green checkmark/shield design */}
        <path
          d="M20 2L4 10V18C4 27.5 10.5 36 20 38C29.5 36 36 27.5 36 18V10L20 2Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.15"
        />
        <path
          d="M20 4L6 11V18C6 26.5 11.5 34 20 36C28.5 34 34 26.5 34 18V11L20 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        <path
          d="M14 20L18 24L26 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
      </svg>
      {!iconOnly && (
        <span className="font-bold text-xl">Vetto</span>
      )}
    </div>
  );
}