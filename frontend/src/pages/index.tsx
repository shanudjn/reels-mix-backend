import React from "react";
import Header from "@/components/ui/Header";
import MainContent from "@/components/ui/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <MainContent />
    </div>
  );
}
