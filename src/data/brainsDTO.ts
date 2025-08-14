export interface BrainsListDto {
    object: string;
    data: BrainDto[];
    has_more?: boolean | null;
    first_id?: string | null;
    last_id?: string | null;
}

export interface BrainDto {
    id: string;
    object: string;
    created_at: number; // Unix seconds

    name?: string | null;
    description?: string | null;
    instructions?: string | null;
    model?: string | null;

    tools: ToolDto[];
    metadata: Record<string, string>;

    top_p?: number | null;
    temperature?: number | null;
    response_format?: string | null;
    file_ids: string[];
    max_output_tokens?: number | null;
}

export interface ToolDto {
    type: string;
    function?: ToolFunctionDto | null;
}

export interface ToolFunctionDto {
    name: string;
    description?: string | null;
    parameters?: Record<string, unknown> | null; // JSON Schema-like
}

// Streaming DTO's (optioneel, voor je SignalR events)
export interface StreamChunkDto { text?: string | null; }

export interface UsageDto {
    requests: number;
    prompt: number;
    completion: number;
    total: number;
}

export interface StreamEndDto { usage?: UsageDto | null; }