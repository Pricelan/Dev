"use client";
import {useEffect, useState} from "react";
import { Download } from "@/types/download";
import { apiFetch } from "@/lib/api";


// Hauptkomponente für die Seite "Meine Downloads"
export default function MeineLizenzen() {
  // Zustand für die Liste der Downloads
  const [downloads, setDownloads] = useState<Download[]>([]);

  // useEffect Hook zum Laden der Downloads beim Initialisieren
  useEffect(() => {
    apiFetch("/lizenzen/meine-lizenzen", {
      method: "GET",
    })
      .then(r => r.json())
      .then(setDownloads);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Meine Downloads
      </h1>

      {downloads.length === 0 ? (
        <p className="text-gray-600">
          Du hast noch keine Downloads.
        </p>
      ) : (
        <div className="space-y-4">
          {downloads.map((download) => (
            <div
              key={download.id}
              className="border rounded-lg p-4"
            >
              <h2 className="font-semibold text-lg">
                {download.software.name}
              </h2>

              <p className="text-sm text-gray-600">
                Version: {download.software.version}
              </p>

              <p className="mt-2 text-sm">
                <span className="font-semibold">
                  Lizenz-Key:
                </span>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {download.lizenzKey}
                </code>
              </p>

              <p className="mt-2">
                <a
                  href={download.downloadLink}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  Download
                </a>
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Gekauft am:{" "}
                {new Date(download.gekauftAm).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}