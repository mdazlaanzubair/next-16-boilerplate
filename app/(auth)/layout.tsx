import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { GalleryVerticalEnd } from "lucide-react";
import QueryProvider from "@/data/queries/QueryProvider";
import { TestimonialSlider } from "./components/TestimonialSlider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication | Acme Inc.",
  description: "Secure login to your account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Force light for corporate feel initially, or system
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="min-w-svw min-h-svh grid grid-cols-1 lg:grid-cols-3">
              {/* Left Column: Visuals */}
              <div className="relative hidden h-full flex-col bg-muted p-10 text-muted-foreground dark:border-r lg:flex lg:col-span-2">
                <div className="absolute inset-0 bg-primary/20" />
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
                  alt="Office Architecture"
                  className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
                />

                {/* Branding */}
                <div className="relative z-20 flex items-center text-lg font-bold text-foreground">
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md mr-2">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  Workbench Inc.
                </div>

                {/* Testimonials */}
                <TestimonialSlider />
              </div>

              {/* Right Column: Form */}
              <div className="flex flex-col items-center justify-center space-y-6 p-5">
                {children}
              </div>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
