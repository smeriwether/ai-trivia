import { default as NextLink } from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface LinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Link = ({
  href,
  onClick,
  disabled,
  children,
  className,
  ...props
}: LinkProps) => {
  const router = useRouter();

  const onLinkClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(href);
  };

  if (disabled) {
    return <Button disabled={disabled}>{children}</Button>;
  }

  if (onClick) {
    return (
      <Button disabled={disabled} onClick={onLinkClick}>
        {children}
      </Button>
    );
  }

  return (
    <NextLink
      href={href}
      className={`flex items-center border border-green-900 p-5 rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-500 aria-selected:bg-green-900 aria-selected:text-white aria-selected:hover:bg-green-900 aria-selected:hover:text-white bg-white dark:bg-slate-700 dark:border-slate-800 dark:hover:bg-slate-600 hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
