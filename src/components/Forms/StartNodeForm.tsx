import { TextField } from "@mui/material";
import { useState } from "react";
import { Node } from "reactflow";
const textStyle = {
  padding: "10px",
};

type StartNodeForm = {
  handleNodeValueChange: (value: any, field: any) => void;
  selectedNode: Node;
};
export const StartNodeForm = ({
  handleNodeValueChange,
  selectedNode,
}: StartNodeForm) => {
  const { data } = selectedNode;
  console.log({ selectedNode });
  const [exportAs, setExportAs] = useState(data?.setExportAs || "");
  const [communicationContext, setCommunicationContext] = useState(
    data?.communicationContext || ""
  );
  const [stage, setStage] = useState(data?.stage || "");
  const [label, setLabel] = useState(data?.label || "");

  return (
    <div>
      <h3 style={textStyle}>Initialize Stage</h3>

      <div style={textStyle}>
        <TextField
          required
          id="label"
          label="Label"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            handleNodeValueChange?.(e.target.value, "label");
          }}
        />
      </div>

      <div style={textStyle}>
        <TextField
          required
          id="export-as"
          label="Export As"
          value={exportAs}
          onChange={(e) => {
            setExportAs(e.target.value);
            handleNodeValueChange?.(e.target.value, "exportAs");
          }}
        />
      </div>
      <div style={textStyle}>
        <TextField
          required
          id="communication-context"
          label="Communication Context"
          value={communicationContext}
          onChange={(e) => {
            setCommunicationContext(e.target.value);
            handleNodeValueChange(e.target.value, "communicationContext");
          }}
        />
      </div>

      <div style={textStyle}>
        <TextField
          required
          id="stage"
          label="Stage"
          value={stage}
          onChange={(e) => {
            setStage(e.target.value);
            handleNodeValueChange(e.target.value, "stage");
          }}
        />
      </div>
    </div>
  );
};
