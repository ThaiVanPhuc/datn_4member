"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  useCaseDiagram,
  sequenceAuthDiagram,
  sequenceOrderDiagram,
  sequenceChatbotDiagram,
  sequenceSellerDiagram,
  activityPurchaseDiagram,
  activityOrderProcessDiagram,
  classDiagram,
  erdDiagram,
  architectureDiagram,
} from "@/lib/diagrams";

const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="text-zinc-400">Loading diagram...</div>
    </div>
  ),
});

const diagrams = [
  {
    id: "use-case",
    title: "1. Use Case Diagram - Tong quan chuc nang",
    chart: useCaseDiagram,
    category: "overview",
  },
  {
    id: "sequence-auth",
    title: "2. Sequence Diagram - Dang ky & Xac thuc",
    chart: sequenceAuthDiagram,
    category: "sequence",
  },
  {
    id: "sequence-order",
    title: "3. Sequence Diagram - Dat hang",
    chart: sequenceOrderDiagram,
    category: "sequence",
  },
  {
    id: "sequence-chatbot",
    title: "4. Sequence Diagram - AI Chatbot",
    chart: sequenceChatbotDiagram,
    category: "sequence",
  },
  {
    id: "sequence-seller",
    title: "5. Sequence Diagram - Dang ky Seller",
    chart: sequenceSellerDiagram,
    category: "sequence",
  },
  {
    id: "activity-purchase",
    title: "6. Activity Diagram - Quy trinh mua hang",
    chart: activityPurchaseDiagram,
    category: "activity",
  },
  {
    id: "activity-order-process",
    title: "7. Activity Diagram - Xu ly don hang (Seller)",
    chart: activityOrderProcessDiagram,
    category: "activity",
  },
  {
    id: "class-diagram",
    title: "8. Class Diagram - Cau truc lop",
    chart: classDiagram,
    category: "structure",
  },
  {
    id: "erd-diagram",
    title: "9. ERD - Entity Relationship Diagram",
    chart: erdDiagram,
    category: "structure",
  },
  {
    id: "architecture",
    title: "10. System Architecture Diagram",
    chart: architectureDiagram,
    category: "architecture",
  },
];

const categories = [
  { id: "all", label: "Tat ca" },
  { id: "overview", label: "Tong quan" },
  { id: "sequence", label: "Sequence" },
  { id: "activity", label: "Activity" },
  { id: "structure", label: "Cau truc" },
  { id: "architecture", label: "Kien truc" },
];

export default function DiagramPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDiagrams =
    selectedCategory === "all"
      ? diagrams
      : diagrams.filter((d) => d.category === selectedCategory);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">
            ShopDoan - System Diagrams
          </h1>
          <p className="text-zinc-400 mb-4">
            E-commerce Marketplace - UML Diagrams
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-lg font-semibold mb-2">Huong dan su dung</h2>
          <ul className="text-zinc-400 text-sm space-y-1">
            <li>- Click Download PNG de tai hinh anh chat luong cao</li>
            <li>- Click Download SVG de tai file vector (co the chinh sua)</li>
            <li>- Su dung bo loc de xem tung loai diagram</li>
          </ul>
        </div>

        <div className="space-y-8">
          {filteredDiagrams.map((diagram) => (
            <MermaidDiagram
              key={diagram.id}
              id={diagram.id}
              title={diagram.title}
              chart={diagram.chart}
            />
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>ShopDoan E-commerce Marketplace - System Documentation</p>
          <p className="mt-1">Generated with Mermaid.js</p>
        </footer>
      </div>
    </main>
  );
}
