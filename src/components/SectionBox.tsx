import { ReactNode } from "react";

interface SectionBoxProps {
  children: ReactNode;
}

export default function SectionBox({ children }: SectionBoxProps) {
  return (
    <div className="bg-white m-3 p-3 md:m-8 md:p-4 shadow">{children}</div>
  );
}
