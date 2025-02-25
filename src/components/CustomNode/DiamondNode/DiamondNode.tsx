import { Handle, NodeResizer, Position } from "reactflow";
import "./DiamondNode.css";

function DiamondNode({ data, selected }: { data: any; selected: boolean }) {
  console.log({ data });
  return (
    <div className="diamond__wrapper">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
        keepAspectRatio
      />

      <div className="diamond__shape">
        <div className="content__wrapper">{data.label}</div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      ></Handle>

      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      ></Handle>

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />

      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />

      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ borderRadius: "50%" }}
        className="custom__handle"
      />
    </div>
  );
}

export default DiamondNode;
