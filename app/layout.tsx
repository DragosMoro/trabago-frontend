import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrabaGo",
  description: "Job Tracking Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-zinc-50 dark:bg-black")}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            storageKey="trabago-theme"
          >
            <QueryProvider>
              <Toaster
                toastOptions={{
                  style: {
                    background: "#09090b",
                    color: "#fff",
                    border: "1px solid #333333",
                  },
                  className: "class",
                }}
              />
              <ModalProvider />

              {children}
            </QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
