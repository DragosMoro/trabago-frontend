import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { DayPickerProps, DayPickerProvider } from "react-day-picker";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-zinc-50 dark:bg-black")}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          storageKey="trabago-theme"
        >
          <QueryProvider>
            <Toaster />
            <ModalProvider />

            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
