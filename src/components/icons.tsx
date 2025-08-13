
import { cn } from "@/lib/utils";
import * as React from "react";

export const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="currentColor"
    stroke="none"
    {...props}
    className={cn("h-8 w-8", props.className)}
  >
    <path d="M51,16.2c-3.3-3.3-7.7-5.2-12.4-5.2H25.4c-4.7,0-9.1,1.9-12.4,5.2C9.7,19.5,7.8,23.9,7.8,28.6 v4.7c0,5.8,2.4,11.3,6.5,15.3l0.1,0.1c4.2,3.9,9.8,6.2,15.6,6.2s11.4-2.2,15.6-6.2l0.1-0.1c4.2-3.9,6.5-9.4,6.5-15.3v-4.7 C56.2,23.9,54.3,19.5,51,16.2z" />
  </svg>
);
