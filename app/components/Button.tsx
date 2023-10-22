import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({
  onClick,
  selected,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      disabled={disabled}
      className={`flex items-center border border-green-900 p-5 rounded disabled:bg-gray-200 dark:disabled:bg-slate-900 dark:disabled:border-slate-900 disabled:text-slate-700 dark:disabled:text-slate-500 disabled:border-gray-500 aria-pressed:bg-green-900 dark:aria-pressed:bg-green-700 aria-pressed:text-white aria-pressed:hover:bg-green-900 dark:aria-pressed:hover:bg-green-700 aria-pressed:hover:text-white bg-white dark:bg-slate-700 dark:border-slate-800 dark:hover:bg-slate-600 hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
