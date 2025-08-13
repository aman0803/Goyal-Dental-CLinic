
import { cn } from "@/lib/utils";
import * as React from "react";

export const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
    className={cn("h-6 w-6", props.className)}
  >
    <path d="M18.8,1.3C15.2,1.3,12.4,4,12,7.4C11.6,4,8.8,1.3,5.2,1.3C1.8,1.3-1,4.1-1,7.5c0,3.1,2.5,5.8,5.7,5.8 c1.9,0,3.6-0.9,4.7-2.3c0.1-0.1,0.1-0.2,0.2-0.2c0.1,0.1,0.2,0.2,0.2,0.2c1.1,1.5,2.9,2.3,4.7,2.3c3.2,0,5.7-2.6,5.7-5.8 C25,4.1,22.2,1.3,18.8,1.3z M4.7,14.5c-0.8,0-1.6,0.1-2.3,0.4c-2.5,0.8-4,2.8-4,5.4v1.6C-1.6,23.2-0.5,24.3,1,24.3h15.4 c1.3,0,2.4-1.1,2.4-2.4v-1.6c0-2.6-1.5-4.6-4-5.4c-0.8-0.2-1.5-0.4-2.3-0.4c-2.3,0-4.4,1.3-5.5,3.3 C8.9,15.8,6.9,14.5,4.7,14.5z" />
    <circle cx="8" cy="8" r="1.5" fill="white"/>
    <circle cx="16" cy="8" r="1.5" fill="white"/>
    <path d="M8.5,12c0,0,1.5,2,3.5,2s3.5-2,3.5-2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
