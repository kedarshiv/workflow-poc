import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Edge } from "reactflow";

const textStyle = {
  padding: "10px",
};

type WorkflowFormTypes = {
  handleEdgeValueChange: (value: any, field: any) => void;
  selectedEdge: Edge;
};
export const EdgeForm = ({
  handleEdgeValueChange,
  selectedEdge,
}: WorkflowFormTypes) => {
  const { data, label: edgeLabel } = selectedEdge;
  const [condition, setCondition] = useState(data?.condition || "");
  const [transitStage, setTransitStage] = useState(data?.transitStage || "");
  const [label, setLabel] = useState(edgeLabel || "");

  return (
    <div>
      <h3 style={textStyle}>Update Edge</h3>

      <div style={textStyle}>
        <TextField
          required
          id="edge-label"
          label="Edge Label"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            handleEdgeValueChange(e.target.value, "label");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="condition"
          label="Condition"
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
            handleEdgeValueChange(e.target.value, "condition");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="transit-stage"
          label="Transit Stage"
          value={transitStage}
          disabled
          onChange={(e) => {
            setTransitStage(e.target.value);
            handleEdgeValueChange(e.target.value, "transitStage");
          }}
        />
      </div>
    </div>
  );
};
