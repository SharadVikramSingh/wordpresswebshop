
import Link from "next/link";
import React from "react";

interface ButtonProps {
  link: string;
  target?: string;
  buttonClass?: string;
  children?: React.ReactNode;
}

function Button({
  link,
  target = "_self",
  buttonClass = "",
  children = "More Info",
}: ButtonProps) {
  const className = `btn_one ${buttonClass}`;

  const content = (
    <>
      {children}
      <span className="arrow">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="arrow-fill"
            d="M0.898589 19.5366L19.5366 0.898561M19.5366 10.2176V0.898561H10.2176"
            stroke="#1A5C38"
            strokeWidth="1.79715"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  const isInternal =
    link.startsWith("/") && !link.startsWith("//");

  if (isInternal && target !== "_blank") {
    return (
      <Link href={link} className={className} target={target}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link}
      className={className}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

export default Button;
