// lib/remedy.ts

export interface RemedySchema {
    missingElement: "Wood" | "Fire" | "Earth" | "Metal" | "Water";
    artStyle: string;
    musicTempo: string;
    colorCode: string;
    keyword: string;
}

export const REMEDY_MAPPING: Record<string, RemedySchema> = {
    Wood: {
        missingElement: "Wood",
        artStyle: "Forest, Growth, Vertical Lines",
        musicTempo: "Andante (Walking Pace, nature sounds)",
        colorCode: "#15803D", // Green
        keyword: "Growth (성장)"
    },
    Fire: {
        missingElement: "Fire",
        artStyle: "Impressionism, Light, Passion, Sun",
        musicTempo: "Allegro (Upbeat, warm energy)",
        colorCode: "#B91C1C", // Red
        keyword: "Passion (열정)"
    },
    Earth: {
        missingElement: "Earth",
        artStyle: "Landscape, Mountains, Texture, Stability",
        musicTempo: "Adagio (Slow, grounding)",
        colorCode: "#A16207", // Brown/Gold
        keyword: "Stability (안정)"
    },
    Metal: {
        missingElement: "Metal",
        artStyle: "Minimalism, Structure, Black & White",
        musicTempo: "Moderato (Clean, precise rhythm)",
        colorCode: "#E5E5E5", // Silver/White
        keyword: "Clarity (명료)"
    },
    Water: {
        missingElement: "Water",
        artStyle: "Abstract, Ocean, Flow, Night",
        musicTempo: "Largo (Flowing, deep resonance)",
        colorCode: "#1E3A8A", // Blue
        keyword: "Wisdom (지혜)"
    }
};

export interface SBTMetadata {
    name: string;
    description: string;
    image: string; // URL to the generated art/remedy card
    attributes: {
        trait_type: string;
        value: string | number;
    }[];
}
