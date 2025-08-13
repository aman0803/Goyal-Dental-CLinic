
import { cn } from "@/lib/utils";
import * as React from "react";

export const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className={cn("h-8 w-16", props.className)}
  >
    <path d="M22.5,1c-5,0-9,4-9,9c0,2.5,1,4.8,2.7,6.5c-2.3,2-5.3,3.3-8.7,3.5c-2,0.1-3.5,1.8-3.5,3.8c0,2.1,1.7,3.8,3.8,3.8h21.4c2.1,0,3.8-1.7,3.8-3.8c0-2-1.5-3.6-3.5-3.8c-3.4-0.2-6.4-1.5-8.7-3.5c1.7-1.7,2.7-4,2.7-6.5c0-5-4-9-9-9z M6,27.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S6.8,27.5,6,27.5z M13,27.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S13.8,27.5,13,27.5z M20,27.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S20.8,27.5,20,27.5z"
      transform="scale(0.8) translate(5, 2)"
      fill="currentColor"
      stroke="none"
    />
    <path d="M26,17 C35,17 40,9 50,9 C60,9 65,17 65,17" stroke="currentColor" fill="none" transform="translate(-10, 0)" />
  </svg>
);
