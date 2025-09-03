import * as React from "react";
import type { Viewport } from "next";

import "@/styles/global.css";

export const viewport = { width: "device-width", initialScale: 1 } satisfies Viewport;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return children;
}