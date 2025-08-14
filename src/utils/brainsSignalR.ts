import * as signalR from "@microsoft/signalr";
import { StreamChunkDto, StreamEndDto } from "../data/brainsDTO";

export type OnStreamChunk = (chunk: StreamChunkDto) => void;
export type OnStreamEnd = (end: StreamEndDto) => void;

export function connectToBrainsHub(
    url: string,
    accessToken: string,
) {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => accessToken
        })
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveMessage", (message: string) => {
        console.log(`Van: ${message}`);
    });

    connection
        .start()
        .then(() => console.log("Connected to brains SignalR hub"))
        .catch(err => console.error("SignalR connection error:", err));

    return connection;
}
