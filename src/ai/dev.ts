
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/generate-feature-summary.ts';
import '@/ai/flows/generate-wellness-tip.ts';
import '@/ai/flows/find-statute.ts';
import '@/ai/flows/generate-elements-flow.ts';
import '@/ai/flows/suggest-charges.ts';
import '@/ai/flows/generate-uof-narrative.ts';
import '@/ai/flows/query-fwc-regulations.ts';
import '@/ai/flows/summarize-debrief.ts';
