export interface RequestSchema {
  notify?: boolean;
}

export type ResponseSchema<D = unknown> = {
  status: 'success' | 'error';
  data: D | null;
  error: Record<string, string> | null;
}