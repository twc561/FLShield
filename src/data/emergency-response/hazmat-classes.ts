
export type HazmatClass = {
    classNumber: string;
    name: string;
    description: string;
    graphicDescription: string;
    exampleID: string;
    exampleName: string;
};

export const hazmatClasses: HazmatClass[] = [
    {
        classNumber: "1",
        name: "Explosives",
        description: "Materials that have a mass explosion hazard.",
        graphicDescription: "Orange placard with an exploding bomb symbol and the number '1' at the bottom.",
        exampleID: "1.4G",
        exampleName: "Consumer Fireworks",
    },
    {
        classNumber: "2",
        name: "Gases",
        description: "Includes flammable, non-flammable, and toxic gases.",
        graphicDescription: "Varies by sub-division: Red for flammable (2.1), Green for non-flammable (2.2), White with skull for toxic (2.3).",
        exampleID: "1075",
        exampleName: "Propane (LPG)",
    },
    {
        classNumber: "3",
        name: "Flammable Liquids",
        description: "Liquids that can easily ignite.",
        graphicDescription: "Red placard with a flame symbol and the number '3' at the bottom.",
        exampleID: "1203",
        exampleName: "Gasoline",
    },
    {
        classNumber: "4",
        name: "Flammable Solids",
        description: "Materials that are spontaneously combustible or dangerous when wet.",
        graphicDescription: "Varies: Red and white stripes for flammable solid (4.1), White over red for spontaneously combustible (4.2), Blue for dangerous when wet (4.3).",
        exampleID: "1386",
        exampleName: "Seed Cake",
    },
    {
        classNumber: "5",
        name: "Oxidizers & Organic Peroxides",
        description: "Substances that can yield oxygen and cause or enhance the combustion of other materials.",
        graphicDescription: "Yellow placard with a flame over a circle symbol. Number '5.1' for Oxidizer, '5.2' for Organic Peroxide.",
        exampleID: "1479",
        exampleName: "Oxidizing Solid, N.O.S.",
    },
    {
        classNumber: "6",
        name: "Toxic & Infectious Substances",
        description: "Materials, other than gases, that are known to be toxic to humans.",
        graphicDescription: "White placard with a skull and crossbones symbol (6.1, Poison) or a biohazard symbol (6.2, Infectious Substance).",
        exampleID: "1544",
        exampleName: "Alkaloids, solid, N.O.S.",
    },
    {
        classNumber: "7",
        name: "Radioactive Materials",
        description: "Any material containing radionuclides where both the activity concentration and the total activity exceed certain pre-defined values.",
        graphicDescription: "Yellow and white placard with the trefoil symbol for radiation and the number '7'.",
        exampleID: "2915",
        exampleName: "Radioactive material",
    },
    {
        classNumber: "8",
        name: "Corrosive Substances",
        description: "Materials that can cause full thickness destruction of skin at the site of contact.",
        graphicDescription: "Black and white placard showing a liquid spilling from test tubes and corroding a hand and a piece of metal, with the number '8'.",
        exampleID: "1830",
        exampleName: "Sulfuric Acid",
    },
    {
        classNumber: "9",
        name: "Miscellaneous Dangerous Goods",
        description: "A catch-all class for materials that present a hazard during transportation but do not meet the definition of any other hazard class.",
        graphicDescription: "White placard with black vertical stripes on the top half and the number '9' at the bottom.",
        exampleID: "3082",
        exampleName: "Environmentally hazardous substance",
    }
];

