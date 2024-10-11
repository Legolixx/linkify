import { ReactNode } from "react";

interface SectionBoxProps {
  children: ReactNode;
}

export default function SectionBox({ children }: SectionBoxProps) {
  return (
    <div className="bg-white m-0 p-0 md:m-8 md:p-4 shadow">{children}</div>
  );
}
