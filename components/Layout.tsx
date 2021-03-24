import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full">
      <Navbar />
      <div className="flex-grow w-full">{children}</div>
      <Footer />
    </div>
  );
}
