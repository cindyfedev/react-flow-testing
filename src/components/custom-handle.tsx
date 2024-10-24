import { memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";

export const CustomHandle = memo(({ data, isConnectable }) => {
  // console.log(data, "what is data in Custom HAndle");
  //   const updateNodeInternals = useUpdateNodeInternals();

  //   console.log(
  //     updateNodeInternals,
  //     "what is updateNodeInternals in CustomHandle"
  //   );
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div style={{ padding: "20px", background: "#fff" }}>
        HOHOHO {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
