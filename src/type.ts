export const enum NodeType {
  Overview = 'overview',
  Question = 'question',
  Answer = 'answer',
}

interface SourceData {
  id: number;
  text: string;
  type: NodeType;
}

interface NodeData {
  key: number;
  text: string;
  color: string;
}

export type { SourceData, NodeData };
