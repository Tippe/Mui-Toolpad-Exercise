// Basis-contracten
export interface IRequest {
  correlationId: string;
}

export interface IResponse {
  correlationId: string;
}

// Domain type (pas aan naar jouw definitie)
export interface SessionSummary {
  id: string;
  title: string;
  // ... voeg velden toe die je server terugstuurt
}

// Requests / Responses

export interface GetSessionsRequest extends IRequest {}

export interface GetSessionsResponse extends IResponse {
  success: boolean;
  sessions: SessionSummary[];
}

export interface SwitchSessionRequest extends IRequest {
  sessionId: string;
}

export interface SwitchSessionResponse extends IResponse {
  success: boolean;
}

export interface RenameSessionRequest extends IRequest {
  sessionId: string;
  newTitle: string;
}

export interface RenameSessionResponse extends IResponse {
  success: boolean;
}

export interface AskLLMSimpleRequest extends IRequest {
  prompt: string;
}

export interface AskLLMSimpleResponse extends IResponse {
  success: boolean;
  response: string;
}
 