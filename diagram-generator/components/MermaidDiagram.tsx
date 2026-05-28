"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { toPng, toSvg } from "html-to-image";
import { saveAs } from "file-saver";

interface MermaidDiagramProps {
  chart: string;
  title: string;
  id: string;
}

export default function MermaidDiagram({ chart, title, id }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "system-ui, sans-serif",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
      },
      er: {
        useMaxWidth: true,
      },
      sequence: {
        useMaxWidth: true,
        showSequenceNumbers: true,
      },
    });

    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = "";
          const { svg } = await mermaid.render(`mermaid-${id}`, chart);
          containerRef.current.innerHTML = svg;
          setIsRendered(true);
          setError(null);
        } catch (err) {
          console.error("Mermaid render error:", err);
          setError(err instanceof Error ? err.message : "Render error");
        }
      }
    };

    renderDiagram();
  }, [chart, id]);

  const downloadPng = async () => {
    if (containerRef.current && isRendered) {
      try {
        const dataUrl = await toPng(containerRef.current, {
          backgroundColor: "#ffffff",
          pixelRatio: 2,
        });
        saveAs(dataUrl, `${id}.png`);
      } catch (err) {
        console.error("Download error:", err);
      }
    }
  };

  const downloadSvg = async () => {
    if (containerRef.current && isRendered) {
      try {
        const dataUrl = await toSvg(containerRef.current, {
          backgroundColor: "#ffffff",
        });
        saveAs(dataUrl, `${id}.svg`);
      } catch (err) {
        console.error("Download error:", err);
      }
    }
  };

  return (
    <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={downloadPng}
            disabled={!isRendered}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-md transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={downloadSvg}
            disabled={!isRendered}
            className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-md transition-colors"
          >
            Download SVG
          </button>
        </div>
      </div>
      <div className="p-4 bg-white overflow-auto max-h-[800px]">
        {error ? (
          <div className="text-red-500 p-4">Error: {error}</div>
        ) : (
          <div ref={containerRef} className="min-h-[200px]" />
        )}
      </div>
    </div>
  );
}
