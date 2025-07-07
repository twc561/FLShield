import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/generate-feature-summary.ts';
import '@/ai/flows/generate-wellness-tip.ts';
import '@/ai/flows/find-statute.ts';
