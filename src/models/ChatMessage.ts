export interface ChatMessage {
    id: string;
    text: string;
    from: "user" | "assistant";
}