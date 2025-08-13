
import { cn } from "@/lib/utils";
import * as React from "react";

export const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className={cn("h-6 w-6", props.className)}
  >
    <path d="M9.34 2.4a2.2 2.2 0 0 1 2.32.74l.95 1.48a2.4 2.4 0 0 0 4.8-.04l.95-1.48a2.2 2.2 0 0 1 2.32-.74c2.42.23 2.42 2.43 2.42 2.43v.05c0 1.8-1.34 3.6-2.82 4.88-1.48 1.27-2.82 2.42-2.82 4.4v2.1c0 .9-.75 1.65-1.65 1.65h-5.1c-.9 0-1.65-.75-1.65-1.65v-2.1c0-1.98-1.34-3.13-2.82-4.4C3.76 8.48 2.42 6.68 2.42 4.88v-.05c0 0 0-2.2 2.42-2.43Z" />
    <path d="M12 12v3.6M15.2 13.5l-1.7 2.1M8.8 13.5l1.7 2.1" />
  </svg>
);
