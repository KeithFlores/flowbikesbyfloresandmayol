"use client";
import { useState, Suspense } from "react";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Toast from "../components/Toast";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="flex">
          <Suspense fallback={null}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </Suspense>

          <div className="flex-1 lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
            <Suspense fallback={null}>
              <Header onMenuClick={() => setIsSidebarOpen(true)} />
            </Suspense>

            <main className="pt-28 pb-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
        <Toast />
      </body>
    </html>
  );
}