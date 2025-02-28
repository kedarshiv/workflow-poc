import { Edge } from "reactflow";

export type EdgeType = Edge & {
  originalSource: string;
};
