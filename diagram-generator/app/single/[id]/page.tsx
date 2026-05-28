"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
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

const diagramsMap: Record<string, { title: string; chart: string }> = {
  "use-case": {
    title: "1. Use Case Diagram - Tong quan chuc nang he thong",
    chart: useCaseDiagram,
  },
  "sequence-auth": {
    title: "2. Sequence Diagram - Dang ky va Xac thuc Email",
    chart: sequenceAuthDiagram,
  },
  "sequence-order": {
    title: "3. Sequence Diagram - Quy trinh Dat hang",
    chart: sequenceOrderDiagram,
  },
  "sequence-chatbot": {
    title: "4. Sequence Diagram - AI Chatbot",
    chart: sequenceChatbotDiagram,
  },
  "sequence-seller": {
    title: "5. Sequence Diagram - Dang ky Seller",
    chart: sequenceSellerDiagram,
  },
  "activity-purchase": {
    title: "6. Activity Diagram - Quy trinh mua hang",
    chart: activityPurchaseDiagram,
  },
  "activity-order-process": {
    title: "7. Activity Diagram - Xu ly don hang Seller",
    chart: activityOrderProcessDiagram,
  },
  "class-diagram": {
    title: "8. Class Diagram - Cau truc lop OOP",
    chart: classDiagram,
  },
  "erd-diagram": {
    title: "9. ERD - Entity Relationship Diagram",
    chart: erdDiagram,
  },
  architecture: {
    title: "10. System Architecture Diagram",
    chart: architectureDiagram,
  },
};

export default function SingleDiagramPage() {
  const params = useParams();
  const id = params.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  const diagram = diagramsMap[id];

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#60a5fa",
        lineColor: "#94a3b8",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
        background: "#0a0a0a",
        mainBkg: "#1e293b",
        secondBkg: "#334155",
        border1: "#475569",
        border2: "#64748b",
        arrowheadColor: "#94a3b8",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "14px",
        textColor: "#e2e8f0",
        actorBkg: "#1e40af",
        actorBorder: "#3b82f6",
        actorTextColor: "#ffffff",
        actorLineColor: "#60a5fa",
        signalColor: "#94a3b8",
        signalTextColor: "#e2e8f0",
        labelBoxBkgColor: "#1e293b",
        labelBoxBorderColor: "#475569",
        labelTextColor: "#e2e8f0",
        loopTextColor: "#94a3b8",
        noteBorderColor: "#f59e0b",
        noteBkgColor: "#78350f",
        noteTextColor: "#fef3c7",
        activationBorderColor: "#3b82f6",
        activationBkgColor: "#1e3a5f",
        sequenceNumberColor: "#ffffff",
        sectionBkgColor: "#1e293b",
        altSectionBkgColor: "#0f172a",
        sectionBkgColor2: "#334155",
        taskBorderColor: "#3b82f6",
        taskBkgColor: "#1e40af",
        taskTextColor: "#ffffff",
        taskTextLightColor: "#e2e8f0",
        taskTextOutsideColor: "#e2e8f0",
        activeTaskBorderColor: "#60a5fa",
        activeTaskBkgColor: "#2563eb",
        gridColor: "#334155",
        doneTaskBkgColor: "#166534",
        doneTaskBorderColor: "#22c55e",
        critBorderColor: "#dc2626",
        critBkgColor: "#991b1b",
        todayLineColor: "#f59e0b",
        personBorder: "#3b82f6",
        personBkg: "#1e40af",
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
        padding: 20,
      },
      sequence: {
        useMaxWidth: true,
        diagramMarginX: 50,
        diagramMarginY: 30,
        actorMargin: 80,
        width: 180,
        height: 65,
        boxMargin: 15,
        boxTextMargin: 8,
        noteMargin: 15,
        messageMargin: 45,
        mirrorActors: true,
        bottomMarginAdj: 10,
        showSequenceNumbers: true,
      },
      er: {
        useMaxWidth: true,
        layoutDirection: "TB",
        minEntityWidth: 120,
        minEntityHeight: 80,
        entityPadding: 20,
      },
    });

    const renderDiagram = async () => {
      try {
        const uniqueId = `diagram-${id}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, diagram.chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="color: red; padding: 20px;">Error rendering diagram</div>`;
        }
      }
    };

    renderDiagram();
  }, [id, diagram]);

  if (!diagram) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Diagram not found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white p-8"
      style={{ backgroundColor: "#ffffff" }}
    >
      <h1
        className="text-2xl font-bold text-center mb-8 text-gray-900"
        style={{ color: "#111827" }}
      >
        {diagram.title}
      </h1>
      <div
        ref={containerRef}
        className="flex justify-center items-start overflow-auto"
        style={{
          minHeight: "600px",
          backgroundColor: "#ffffff",
        }}
      />
      {rendered && (
        <p
          className="text-center mt-4 text-sm text-gray-500"
          style={{ color: "#6b7280" }}
        >
          ShopDoan E-commerce Marketplace
        </p>
      )}
    </div>
  );
}
