/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import React, {
  cloneElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: "default-home", icon: <DefaultHomeIcon />, label: "Home" },
  { id: "default-explore", icon: <DefaultCompassIcon />, label: "Explore" },
  {
    id: "default-notifications",
    icon: <DefaultBellIcon />,
    label: "Notifications",
  },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  // scale multiplier, e.g. 1.2 makes the component 20% bigger (default 1.2)
  scale?: number;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
  scale = 1.2, // default: 20% bigger
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items, scale]);

  useEffect(() => {
    const time = setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * defaultNavItems.length));
    }, 2000);
    return () => clearInterval(time);
  }, []);

  if (items.length === 0) {
    return null;
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={cn(
        "relative inline-flex items-center h-8 rounded-md bg-card text-foreground border px-1",
        className,
      )}
      // scale the whole nav visually; the default makes it 20% bigger
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <button
          key={id}
          ref={(el) => {
            navItemRefs.current[index] = el;
          }}
          className={cn(
            "relative z-20 flex h-full  items-center justify-center px-2",
            iconContainerClassName,
          )}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(
            icon as React.ReactElement<unknown>,
            {
              className: cn(
                // keep the original width/height classes, add transform transition
                "w-4 h-4 transition-opacity transition-transform duration-100 ease-in-out",
                activeIndex === index ? "opacity-100" : "opacity-40",
                // icon.props?.className,
                iconClassName || "",
              ),
              // increase icon scale by 15%, preserving any existing inline transform
              style: {
                ...((icon.props as any)?.style || {}),
                transform: `${
                  (((icon.props as any)?.style || {}) as any).transform
                    ?.toString()
                    .trim() || ""
                } scale(1.15)`.trim(),
              },
            } as any,
          )}
        </button>
      ))}

      <div
        ref={limelightRef}
        className={cn(
          "absolute top-0 z-10 w-8 h-[4px] rounded-full bg-primary shadow-[0_20px_10px_var(--primary)]",
          isReady ? "transition-[left] duration-300 ease-in-out" : "",
          limelightClassName,
        )}
        style={{ left: "-999px" }}
      >
        <div className="absolute left-[-30%] top-[6px] w-[160%] h-8 [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)] bg-linear-to-b from-primary/20 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
