export type Flavor = {
  name: string;
  color: string;
  dark: string;
  desc: string;
  tags: string[];
  heat: number;
};

export const FLAVORS: Flavor[] = [
  {
    name: "Original",
    color: "#D3181F",
    dark: "#7f0e12",
    desc: "The one that started the stack. Just potato, salt, and that unmistakable curve — the flavor every other can gets measured against.",
    tags: ["Salted", "Classic", "Crowd Favorite"],
    heat: 10,
  },
  {
    name: "Sour Cream & Onion",
    color: "#3E7D3A",
    dark: "#204a1e",
    desc: "Tangy up front, savory on the finish. The green can that quietly out-sells half the flavor wall every single year.",
    tags: ["Tangy", "Creamy", "Herby"],
    heat: 15,
  },
  {
    name: "Cheddar Cheese",
    color: "#F0A020",
    dark: "#9c6410",
    desc: "Sharp, orange, and completely unsubtle about it. If your fingers aren't dusted by the third chip, you're not doing it right.",
    tags: ["Sharp", "Bold", "Snack-Bag Favorite"],
    heat: 25,
  },
  {
    name: "BBQ",
    color: "#8A4A1C",
    dark: "#4d280e",
    desc: "Smoky, sweet, a little sticky at the edges — the flavor that turns any road trip glovebox into a permanent snack drawer.",
    tags: ["Smoky", "Sweet-Heat", "Roadtrip Staple"],
    heat: 45,
  },
  {
    name: "Pizza",
    color: "#E24A1E",
    dark: "#7f280e",
    desc: "Oregano, tomato, and a wink of garlic — built for the person who wants pizza night without waiting for the oven.",
    tags: ["Herby", "Savory", "Late Night"],
    heat: 30,
  },
  {
    name: "Salt & Vinegar",
    color: "#1F6FB2",
    dark: "#0f3a60",
    desc: "Sharp enough to make you blink. Not for the faint of heart — but once it clicks, every other flavor tastes a little flat.",
    tags: ["Sharp", "Acidic", "Not For Beginners"],
    heat: 70,
  },
];
