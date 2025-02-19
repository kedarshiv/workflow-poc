import React from "react";
import { Button } from "@mui/material";
import { useFlowStore } from "../store";

const ExportJson: React.FC = () => {
  const { nodes, edges } = useFlowStore();

  const exportJSON = () => {
    const json = {
      nodes: nodes.map((n: any) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges,
    };
    console.log("Exported JSON:", JSON.stringify(json, null, 2));
  };

  return (
    <Button onClick={exportJSON} variant="outlined" style={{ marginTop: 10 }}>
      Export JSON
    </Button>
  );
};

export default ExportJson;
