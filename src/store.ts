import { create } from "zustand";
import { nanoid } from "nanoid";
import { Edge, Node } from "reactflow";

interface FlowStore {
  nodes: Node[];
  edges: Edge[];
  addNode: (type: string) => void;
  addEdge: (source: string, target: string, label: string) => void;
}

export const useFlowStore = create<FlowStore>((set) => ({
  nodes: [
    {
      id: "start",
      type: "default",
      position: { x: 100, y: 100 },
      data: { label: "Start" },
    },
  ],
  edges: [],
  addNode: (type) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: nanoid(),
          type,
          position: { x: Math.random() * 600, y: Math.random() * 400 },
          data: { label: type },
        },
      ],
    })),
  addEdge: (source, target, label) =>
    set((state) => ({
      edges: [
        ...state.edges,
        {
          id: nanoid(),
          source,
          target,
          label,
          animated: true,
        },
      ],
    })),
}));
