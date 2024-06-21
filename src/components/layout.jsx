'use client'
import { ThemeProvider } from "@material-tailwind/react";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}