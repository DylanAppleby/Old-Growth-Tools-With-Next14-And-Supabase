"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import List from "@/components/List";
import CollapsedCard from "@/components/collapsed-card/CollapsedCard";
import SEO from "@/components/SEO";
import { useDispatch } from "react-redux";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { fetchTools } from "@/lib/redux/features/tools/toolsSlice";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);

  return (
    <main className={`${inter.className}`}>
      <SEO
        title="Dir - A simple directory listing template"
        description="A simple directory listing template built with Next.js and Tailwind CSS."
        favicon="/favicon.ico"
        image="/og.png"
        url="https://copyui.com/"
        name="Copy UI"
      />

      <div className="flex dark:bg-black">
        <Sidebar />
        <div className="main pl-7 w-full min-h-[100vh] scrollbar-hide overflow-y-auto">
          <Hero />
          <CollapsedCard />
          <List />
        </div>
      </div>
    </main>
  );
}
