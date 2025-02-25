import { Handle, NodeResizer, Position } from "reactflow";
import "./CircleNodes.css";

export const CircleNodeEnd = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => (
  <div className="circle__wrapper">
    <NodeResizer
      color="#ff0071"
      isVisible={selected}
      minWidth={100}
      minHeight={30}
    />
    {data.label}
    <Handle type="target" position={Position.Left} />
  </div>
);

export const CircleNodeStart = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => (
  <div className="circle__wrapper">
    <NodeResizer
      color="#ff0071"
      isVisible={selected}
      minWidth={100}
      minHeight={30}
    />
    {data.label}

    <Handle type="source" position={Position.Right} />
  </div>
);

export const CircleNode = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => (
  <div className="circle__wrapper">
    <NodeResizer
      color="#ff0071"
      isVisible={selected}
      minWidth={100}
      minHeight={30}
    />
    {data.label}
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);
