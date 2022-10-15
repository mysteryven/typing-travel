type DiffType = 'match' | 'substitute' | 'delete' | 'insert';
export type DiffItem = {
  type: DiffType;
  content: string;
};
export interface Cell {
  cost: number;
  parent: number;
}

export type DiffTravel = [DiffItem[], DiffItem[], DiffItem[]]