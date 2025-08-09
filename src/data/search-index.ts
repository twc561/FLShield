
/**
 * @fileOverview A unified search index for the entire application.
 * This file imports all relevant data sources, transforms them into a
 * consistent `SearchableItem` format, and exports a single array
 * that can be used by a local search service.
 */

import { caseLawIndex } from '@/data/case-law';
import { statuteIndex } from '@/data/statutes';
import { scenarioChecklistsData } from '@/data/field-procedures/scenario-checklists';
import { k9GuideIndex } from '@/data/specialized-enforcement/k9-guide-index';
import { fishingRegulations, huntingRegulations, boatingTopics, protectedSpeciesInfo } from '@/data/specialized-enforcement/fwc-regulations';
import { commonMisperceptionsData } from '@/data/officer-wellness-rights/common-misperceptions';
import { menuItems } from '@/lib/menu-items';
import { handcuffingData } from './restraint-techniques/handcuffing';

export type SearchableItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string[];
};

// Transform Case Law data
const caseLawItems: SearchableItem[] = caseLawIndex.map(c => ({
  id: `caselaw-${c.id}`,
  title: c.title,
  description: `Case Law: ${c.citation}`,
  category: 'Legal Reference',
  href: '/legal-reference/case-law',
  keywords: Array.isArray(c.tags) ? [c.title, c.category, ...c.tags] : [c.title, c.category],
}));

// Transform Statute data
const statuteItems: SearchableItem[] = statuteIndex.map(s => ({
  id: `statute-${s.id}`,
  title: s.title,
  description: `Florida Statute: ${s.code}`,
  category: 'Legal Reference',
  href: '/legal-reference/statutes',
  keywords: [s.title, s.code, s.category, 'statute', 'law', s.degreeOfCharge].filter(Boolean) as string[],
}));

// Transform Scenario Checklist data
const scenarioItems: SearchableItem[] = Object.values(scenarioChecklistsData).map(s => ({
    id: `scenario-${s.id}`,
    title: s.name,
    description: `Field Checklist: ${s.subtitle}`,
    category: 'Field Procedures',
    href: '/field-procedures/scenario-checklists',
    keywords: [s.name, s.subtitle, s.category, ...(Array.isArray(s.keyStatutes) ? s.keyStatutes : []), 'checklist', 'procedure', s.goal].filter(Boolean) as string[],
}));

// Transform K9 Guide data
const k9HandlerItems: SearchableItem[] = k9GuideIndex.forHandlers.map(item => ({
    id: `k9-handler-${item.id}`,
    title: item.title,
    description: `K-9 Guide (Handler): ${item.subtitle}`,
    category: 'Specialized Enforcement',
    href: '/specialized-enforcement/k9-officer-guide',
    keywords: [item.title, item.subtitle, 'k-9', 'k9', 'dog', 'handler'],
}));

const k9PatrolItems: SearchableItem[] = k9GuideIndex.forPatrol.map(item => ({
    id: `k9-patrol-${item.id}`,
    title: item.title,
    description: `K-9 Guide (Patrol): ${item.subtitle}`,
    category: 'Specialized Enforcement',
    href: '/specialized-enforcement/k9-officer-guide',
    keywords: [item.title, item.subtitle, 'k-9', 'k9', 'dog', 'patrol'],
}));


// Transform FWC data
const fwcFishingItems: SearchableItem[] = fishingRegulations.map(item => ({
    id: `fwc-fish-${item.speciesName.replace(/\s+/g, '-')}`,
    title: `${item.speciesName} (Fishing)`,
    description: `FWC Fishing Regulation: ${item.facRule}`,
    category: 'FWC Regulations',
    href: '/specialized-enforcement/fwc-regulations-guide',
    keywords: [item.speciesName, ...item.commonNames.split(','), 'fwc', 'fishing', 'fish'],
}));

const fwcHuntingItems: SearchableItem[] = huntingRegulations.map(item => ({
    id: `fwc-hunt-${item.speciesName.replace(/\s+/g, '-')}`,
    title: `${item.speciesName} (Hunting)`,
    description: `FWC Hunting Regulation: ${item.facRule}`,
    category: 'FWC Regulations',
    href: '/specialized-enforcement/fwc-regulations-guide',
    keywords: [item.speciesName, 'fwc', 'hunting', 'hunt'],
}));

const fwcBoatingItems: SearchableItem[] = boatingTopics.map(item => ({
    id: `fwc-boat-${item.title.replace(/\s+/g, '-')}`,
    title: item.title,
    description: `FWC Boating Information`,
    category: 'FWC Regulations',
    href: '/specialized-enforcement/fwc-regulations-guide',
    keywords: [item.title, 'fwc', 'boating', 'boat', 'vessel'],
}));

const fwcSpeciesItems: SearchableItem[] = protectedSpeciesInfo.map(item => ({
    id: `fwc-species-${item.speciesName.replace(/\s+/g, '-')}`,
    title: `${item.speciesName} (${item.category})`,
    description: `FWC Species Information`,
    category: 'FWC Regulations',
    href: '/specialized-enforcement/fwc-regulations-guide',
    keywords: [item.speciesName, item.category, 'fwc', 'species', 'protected'],
}));

const misperceptionItems: SearchableItem[] = commonMisperceptionsData.map(item => ({
    id: `misc-${item.id}`,
    title: `Misperception: ${item.theMisperception}`,
    description: `Training: Debunking common field pitfalls.`,
    category: 'Training & Development',
    href: '/training-development/common-misperceptions',
    keywords: [item.theMisperception, item.category, 'training', 'myth', 'pitfall', ...item.keyCaseLaw.caseName.split(' ')]
}));

const handcuffingItems: SearchableItem[] = handcuffingData.techniques.map(t => ({
    id: `handcuffing-${t.id}`,
    title: t.title,
    description: `Restraint Technique: ${t.description}`,
    category: 'Restraint Techniques',
    href: '/restraint-techniques/handcuffing-procedures',
    keywords: ['handcuffing', 'restraint', t.title.toLowerCase(), 'cuffing', 'detain'],
}));

// Dynamically create search items from the menu structure
const menuSearchItems: SearchableItem[] = [];
menuItems.forEach(item => {
    if (item.items) {
        item.items.forEach(subItem => {
            menuSearchItems.push({
                id: `menu-${subItem.href.replace(/\//g, '-')}`,
                title: subItem.label,
                description: `Navigate to the ${subItem.label} tool.`,
                category: item.label,
                href: subItem.href,
                keywords: [subItem.label, item.label, 'tool', 'guide', 'page']
            });
        });
    } else if (item.href) {
        menuSearchItems.push({
            id: `menu-${item.href.replace(/\//g, '-')}`,
            title: item.label,
            description: `Navigate to the ${item.label} page.`,
            category: "Navigation",
            href: item.href,
            keywords: [item.label, 'page', 'navigation']
        });
    }
});


export const unifiedSearchIndex: SearchableItem[] = [
  ...caseLawItems,
  ...statuteItems,
  ...scenarioItems,
  ...k9HandlerItems,
  ...k9PatrolItems,
  ...fwcFishingItems,
  ...fwcHuntingItems,
  ...fwcBoatingItems,
  ...fwcSpeciesItems,
  ...misperceptionItems,
  ...handcuffingItems,
  ...menuSearchItems,
  {
    id: 'feature-jurisdiction-finder',
    title: 'Jurisdiction Finder',
    description: 'Use GPS to identify your current jurisdiction and access local laws.',
    category: 'Field Operations & Procedures',
    href: '/field-procedures/jurisdiction-finder',
    keywords: ['jurisdiction', 'finder', 'gps', 'location', 'ordinance', 'city', 'county']
  },
  {
    id: 'feature-ai-tools',
    title: 'AI Assistant Tools',
    description: 'A hub for all AI-powered features in the application.',
    category: 'AI Assistant Tools',
    href: '/ai-tools',
    keywords: ['ai', 'tools', 'assistant', 'hub', 'artificial intelligence']
  },
  {
    id: 'feature-role-play-simulator',
    title: 'AI Role-Play Simulator',
    description: 'Practice de-escalation with a variety of AI personas.',
    category: 'AI Assistant Tools',
    href: '/training-development/role-play-simulator',
    keywords: ['role-play', 'simulator', 'training', 'de-escalation', 'ai', 'persona']
  }
];
