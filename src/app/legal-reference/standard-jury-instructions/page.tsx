import { PageHeader } from "@/components/PageHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

export default function StandardJuryInstructionsRedirectPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Jury Instructions"
        description="This section has been upgraded."
      />
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Feature Update</AlertTitle>
        <AlertDescription>
          The Jury Instructions guide has been replaced by the new, more accurate{" "}
          <strong>Jury Instructions Navigator</strong>. This new tool uses a
          multi-step AI process to ensure you always get the correct
          information.
        </AlertDescription>
      </Alert>
      <Button asChild className="mt-4">
        <Link href="/legal-reference/jury-instructions-navigator">
          Go to the New Navigator
        </Link>
      </Button>
    </div>
  );
}
