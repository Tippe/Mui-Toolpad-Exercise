import { Action, ActionCategory } from "../pages/action";

export const CATEGORIES: ActionCategory[] = [
    { id: 1, name: "Tekstgenerator" },
    { id: 2, name: "Analyse" },
    { id: 3, name: "Creatief" },
    { id: 4, name: "Communicatie" },
    { id: 5, name: "Data Processor" },
];

export const MOCK_ACTIONS: Action[] = [
    // Text Editing
    {
        id: "a1",
        name: "Summarizer",
        description: "Maak een korte samenvatting van de tekst",
        miniPrompt: "Vat de volgende tekst samen in 3 zinnen: {input}",
        temperature: 0.7,
        maxTokens: 300,
        category: CATEGORIES[0],
    },
    {
        id: "a2",
        name: "Translator",
        description: "Vertaal tekst naar een andere taal",
        miniPrompt: "Vertaal de volgende tekst naar Engels: {input}",
        temperature: 0.7,
        maxTokens: 500,
        category: CATEGORIES[0],
    },
    {
        id: "a3",
        name: "Paraphraser",
        description: "Herschrijf de tekst met behoud van betekenis",
        miniPrompt: "Herschrijf dit zodat het eenvoudiger te begrijpen is: {input}",
        temperature: 0.75,
        maxTokens: 400,
        category: CATEGORIES[0],
    },

    // Analysis
    {
        id: "a4",
        name: "Sentimenter",
        description: "Bepaal de emotionele lading van een tekst",
        miniPrompt: "Wat is de toon van deze tekst: {input}?",
        temperature: 0.6,
        maxTokens: 200,
        category: CATEGORIES[1],
    },
    {
        id: "a5",
        name: "KeyExtractor",
        description: "Haal de belangrijkste woorden of zinnen uit tekst",
        miniPrompt: "Wat zijn de kernwoorden in deze tekst: {input}?",
        temperature: 0.65,
        maxTokens: 250,
        category: CATEGORIES[1],
    },

    // Creative
    {
        id: "a6",
        name: "Poetizer",
        description: "Maak een gedicht van tekst of een thema",
        miniPrompt: "Maak een gedicht over: {input}",
        temperature: 1.2,
        maxTokens: 400,
        category: CATEGORIES[2],
    },
    {
        id: "a7",
        name: "StoryCrafter",
        description: "Schrijf een kort verhaal gebaseerd op een thema",
        miniPrompt: "Schrijf een kort verhaal over: {input}",
        temperature: 1.0,
        maxTokens: 500,
        category: CATEGORIES[2],
    },

    // Communication
    {
        id: "a8",
        name: "MailComposer",
        description: "Genereer een professionele of informele e-mail",
        miniPrompt: "Schrijf een e-mail over: {input}",
        temperature: 0.85,
        maxTokens: 350,
        category: CATEGORIES[3],
    },
    {
        id: "a9",
        name: "ReplyGenerator",
        description: "Genereer een reactie op een bericht",
        miniPrompt: "Wat is een vriendelijk antwoord op: {input}?",
        temperature: 0.8,
        maxTokens: 300,
        category: CATEGORIES[3],
    },

    // Data Processor
    {
        id: "a10",
        name: "Columnizer",
        description: "Zet vrije tekst om in kolommen/tabelvorm",
        miniPrompt: "Zet deze lijst om in een tabel: {input}",
        temperature: 0.7,
        maxTokens: 400,
        category: CATEGORIES[4],
    },
    {
        id: "a11",
        name: "Aggregator",
        description: "Combineer data en bereken totalen of gemiddelden",
        miniPrompt: "Geef het totaal van de volgende data: {input}",
        temperature: 0.7,
        maxTokens: 300,
        category: CATEGORIES[4],
    },
    {
        id: "a12",
        name: "FilterBot",
        description: "Filter data volgens opgegeven criteria",
        miniPrompt: "Laat alleen items zien die voldoen aan: {input}",
        temperature: 0.7,
        maxTokens: 300,
        category: CATEGORIES[4],
    },
];

