'use client';
import { useEffect, useState } from 'react';
import Hero from "../components/Hero/Hero";
import RecipesList from "../components/Recipes/RecipesList";
import Navbar from "@/components/Navbar";
import Navbarone from "@/components/Navbarone";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <Navbarone /> : <Navbar />}
      <Hero />
      <RecipesList />
    </div>
  );
}
