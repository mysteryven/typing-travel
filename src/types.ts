type DiffType = 'match' | 'substitute' | 'delete' | 'insert';
export type DiffResult = {
  type: DiffType;
  content: string;
};
export interface Cell {
  cost: number;
  parent: number;
}
