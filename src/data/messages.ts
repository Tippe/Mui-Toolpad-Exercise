export interface ChatMessage {
    id: string;
    text: string;
    from: "user" | "ai";
}

export const mockMessages: ChatMessage[] = [
  { id: "1", text: "Welkom bij de chat!", from: "ai" },
  { id: "2", text: "Hi! Hoe werkt dit?", from: "user" },
  {
    id: "3",
    text: "Je kunt acties draggen naar hier en vragen stellen.",
    from: "ai",
  },
  { id: "4", text: "Ah, duidelijk!", from: "user" },
];
