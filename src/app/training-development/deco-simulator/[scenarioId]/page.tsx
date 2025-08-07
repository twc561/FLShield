import { notFound } from 'next/navigation';
import { decoScenarios } from '@/data/training/deco-scenarios';
import DecoScenarioClient from '../DecoScenarioClient';

export default function DecoScenarioPage({ params }: { params: { scenarioId: string } }) {
  const scenario = decoScenarios.find(s => s.id === params.scenarioId);

  if (!scenario) {
    notFound();
  }

  // The full DECO prompt will be constructed and passed to the client.
  // For now, we are just passing the scenario details.
  // The actual master prompt is very large and will be handled in the AI flow.

  return (
    <div className="container mx-auto p-4 md:p-6 h-full">
        {/* The DecoScenarioClient will be created in the next step.
            This page finds the correct scenario and passes its data to the client. */}
        <DecoScenarioClient scenario={scenario} />
    </div>
  );
}

// This function helps Next.js to statically generate routes at build time.
export async function generateStaticParams() {
  return decoScenarios.map(scenario => ({
    scenarioId: scenario.id,
  }));
}
