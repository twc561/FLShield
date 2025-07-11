// src/app/legal-reference/case-law/page.tsx - FINAL CORRECTED

import { CaseLawClient } from './CaseLawClient';
import { caseLawIndex } from '@/data/case-law';

// A simple, placeholder function to get data.
// In a real app, this would fetch from a database.
async function getCaseLawData() {
  // Using the local index data to ensure the build passes.
  return caseLawIndex.map(c => ({
      id: c.id,
      title: c.title,
      summary: `Citation: ${c.citation}`
  }));
}

export default async function CaseLawPage() {
  // Fetch the data on the server.
  const caseLawItems = await getCaseLawData();

  // Pass the data to the Client Component.
  return <CaseLawClient initialData={caseLawItems} />;
}
