// src/app/legal-reference/case-law/CaseLawClient.tsx - FINAL CORRECTED

"use client"; // This MUST be the very first line.

import React, { useState } from 'react';

// Define a simple type for your data.
type CaseLawItem = {
  id: string;
  title: string;
  summary: string;
};

type CaseLawClientProps = {
  initialData: CaseLawItem[];
};

export function CaseLawClient({ initialData }: CaseLawClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // A safe way to filter data.
  const filteredData = (initialData || []).filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Case Law Reference</h1>
      <input
        type="text"
        placeholder="Search case law..."
        className="w-full p-2 border rounded mb-4 bg-card text-foreground"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-4">
        {filteredData.map((item) => (
          <div key={item.id} className="p-4 border rounded bg-card">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
