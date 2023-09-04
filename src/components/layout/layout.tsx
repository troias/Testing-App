import React from "react";

//layout component that will be uses children

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-6 gap-4 min-h-screen mx-4">
      <div className="col-span-6">{children}</div>
    </div>
  );
}
