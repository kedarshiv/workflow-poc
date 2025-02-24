import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Edge } from "reactflow";

const textStyle = {
  padding: "10px",
};

type WorkflowFormTypes = {
  selectedEdge: Edge;
  handleEdgeValueChange: (value: any, field: any) => void;
};
export const EdgeForm = ({
  selectedEdge,
  handleEdgeValueChange,
}: WorkflowFormTypes) => {
  console.log({ selectedEdge });
  const [condition, setCondition] = useState("");
  const [transitStage, setTransitStage] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const data = selectedEdge?.data;
    setCondition(data?.condition || "");
    setLabel((selectedEdge?.label as string) || "");
    setTransitStage(data?.transitStage || "");
  }, [selectedEdge]);

  return (
    <div>
      <h3 style={textStyle}>Update Edge</h3>

      <div style={textStyle}>
        <TextField
          required
          id="edge-label"
          label="Edge Label"
          value={label}
          onChange={(e) => handleEdgeValueChange(e.target.value, "label")}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="condition"
          label="Condition"
          value={condition}
          onChange={(e) => handleEdgeValueChange(e.target.value, "condition")}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="transit-stage"
          label="Transit Stage"
          value={transitStage}
          onChange={(e) =>
            handleEdgeValueChange(e.target.value, "transitStage")
          }
        />
      </div>
    </div>
  );
};
