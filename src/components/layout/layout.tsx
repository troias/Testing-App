import React from "react";

//layout component that will be uses children

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-6 gap-4 min-h-screen mx-2">
      <div className="bg-red-500/30 h-screen"></div>
      <div className="bg-red-500/30 "></div>
      <div className="bg-red-500/30"></div>
      <div className="bg-red-500/30 "></div>
      <div className="bg-red-500/30"></div>
      <div className="bg-red-500/30 "></div>

      {children}
    </div>
  );
}
