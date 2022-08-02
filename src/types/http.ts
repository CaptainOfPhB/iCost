export interface RequestSchema {
  intact?: boolean;
}

export type ResponseSchema<D = unknown, E = unknown> = {
  data: D | null;
  error: E | null;
  status: 'success' | 'error';
}