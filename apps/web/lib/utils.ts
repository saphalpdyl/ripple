import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Card } from "@repo/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateGamerUsername() {
  const adjectives = ['Shadow', 'Epic', 'Mystic', 'Dark', 'Fierce', 'Savage', 'Golden', 'Phantom', 'Rogue', 'Blazing'];
  const nouns = ['Warrior', 'Hunter', 'Slayer', 'Knight', 'Mage', 'Ninja', 'Assassin', 'Legend', 'Champion', 'Warlord'];
  const numbers = Math.floor(Math.random() * 1000); // Random number between 0 and 999

  // Randomly pick an adjective and a noun
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // Combine them into a username
  return `${adjective}${noun}${numbers}`;
}