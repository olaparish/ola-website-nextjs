import Link from "next/link";
import type { FC, ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  to: string;
  children: ReactNode;
  className?: string;
};

const CustomLink: FC<Props> = ({ children, className = "", to }) => {
  return (
    <Link
      href={to}
      className={`px-11 py-3 bg-primary-900 text-[16px] hover:bg-primary-700 text-white ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
