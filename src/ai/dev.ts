
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
import '@/ai/flows/proofread-report.ts';
import '@/ai/flows/roleplay-simulator.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/active-listener.ts';
import '@/ai/flows/trilingual-tts.ts';
