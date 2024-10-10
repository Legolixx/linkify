import { ReactNode } from 'react';

interface SectionBoxProps {
  children: ReactNode;
}

export default function SectionBox({ children }: SectionBoxProps) {
  return <div className="bg-white m-8 p-4 shadow">{children}</div>;
}
