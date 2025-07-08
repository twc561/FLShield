export type ControlledSubstance = {
  id: string;
  name: string;
  category: string;
  statute: string;
  imageAiHint: string;
  streetNames: string[];
  paraphernalia: string;
  observations: string;
};

export const controlledSubstancesData: ControlledSubstance[] = [
  {
    id: "cocaine",
    name: "Cocaine (Powder & Crack)",
    category: "Stimulant",
    statute: "893.13 / 893.135",
    imageAiHint: "white powder crack cocaine",
    streetNames: ["Coke", "Blow", "Snow", "Rock", "Crack"],
    paraphernalia: "Glass pipes ('crack pipes'), small plastic baggies, razor blades, rolled-up dollar bills or straws, burnt spoons.",
    observations: "Dilated pupils, restlessness, talkativeness, hyperactivity, white powder residue around nostrils. For crack, burn marks on fingers/lips.",
  },
  {
    id: "heroin",
    name: "Heroin",
    category: "Opioid",
    statute: "893.13 / 893.135",
    imageAiHint: "black tar heroin",
    streetNames: ["Smack", "H", "Junk", "Black Tar", "Dope"],
    paraphernalia: "Hypodermic needles, spoons with burn marks, lighters, cotton balls, tourniquets (belts, shoelaces).",
    observations: "Constricted ('pinpoint') pupils, drowsiness ('on the nod'), slurred speech, track marks on arms/legs.",
  },
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "Synthetic Opioid",
    statute: "893.13 / 893.135",
    imageAiHint: "pills fentanyl",
    streetNames: ["Fenty", "China White", "Percs", "Blues", "M30s"],
    paraphernalia: "Often found as counterfeit pills (resembling Oxycodone), needles, burnt foil, straws for snorting.",
    observations: "Extreme drowsiness, pinpoint pupils, confusion, respiratory depression (slow/shallow breathing). Officer safety is paramount; do not handle suspected fentanyl without proper PPE.",
  },
  {
    id: "methamphetamine",
    name: "Methamphetamine",
    category: "Stimulant",
    statute: "893.13 / 893.135",
    imageAiHint: "crystal meth",
    streetNames: ["Meth", "Crystal", "Ice", "Speed", "Glass"],
    paraphernalia: "Glass pipes with a bulbous end, needles, small baggies, torches/lighters.",
    observations: "Dilated pupils, rapid speech, paranoia, agitation, erratic behavior, significant weight loss, sores on skin ('meth mites').",
  },
  {
    id: "cannabis",
    name: "Cannabis (Marijuana)",
    category: "Cannabinoid",
    statute: "893.13",
    imageAiHint: "cannabis marijuana",
    streetNames: ["Weed", "Pot", "Grass", "Bud", "Ganja"],
    paraphernalia: "Rolling papers, pipes ('bowls'), water pipes ('bongs'), grinders, vaporizers.",
    observations: "Red, glassy eyes; strong, distinct odor; delayed reaction time; increased appetite. Note: possession of a medical marijuana card is a defense, but driving under the influence is still illegal.",
  },
  {
    id: "mdma",
    name: "MDMA (Ecstasy/Molly)",
    category: "Stimulant/Hallucinogen",
    statute: "893.13 / 893.135",
    imageAiHint: "pills ecstasy",
    streetNames: ["Ecstasy", "Molly", "E", "X", "Rolls"],
    paraphernalia: "Often sold as colorful pills with logos or as a powder/crystal ('Molly'). Pacifiers or lollipops to prevent teeth grinding.",
    observations: "Dilated pupils, profuse sweating, heightened sense of touch, unusual empathy or friendliness, teeth grinding (bruxism).",
  },
];
