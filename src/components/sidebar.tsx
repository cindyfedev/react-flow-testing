import { useNodes } from "@xyflow/react";

export function Sidebar() {
  // This hook will only work if the component it's used in is a child of a
  // <ReactFlowProvider />.
  const nodes = useNodes();

  const textNode = nodes.filter((node) => node.id === "textnode-1")[0];

  // console.log(textNode, "what is textNode in sidebar");

  return (
    <aside
      style={{
        position: "absolute",
        zIndex: 10,
        left: 0,
        top: 0,
        border: "2px solid black",
      }}
    >
      <p>I am outside react flow</p>
      {nodes.map((node) => (
        <div key={node.id}>
          #{node.id} type {node.type} x: {node.position.x.toFixed(2)}, y:{" "}
          {node.position.y.toFixed(2)}
        </div>
      ))}
    </aside>
  );
}
