import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Panel,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { CustomNode } from "./custom-node";

import "../index.css";
import TextUpdaterNode from "./text-node";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CustomHandle } from "./custom-handle";
import { Button } from "./submit-button";

const initBgColor = "#888";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];

// either define nodetypes outside the component or memoize
// const nodeTypes = {
//   selectorNode: CustomNode,
//   textUpdater: TextUpdaterNode,
//   myhandle: CustomHandle,
// };

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const methods = useForm();

  // define nodeTypes inside to see if we can pass in extra props in the custom Node

  const nodeTypes = useMemo(
    () => ({
      selectorNode: CustomNode,
      textUpdater: (props) => (
        <TextUpdaterNode {...props} setNodes={setNodes} />
      ),
      myhandle: CustomHandle,
    }),
    []
  );

  const onSubmit = (data) =>
    console.log(data, "data on submit testing reat hook form");

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: "1",
        type: "input",
        data: { label: "An input node" },
        position: { x: 0, y: 50 },
        sourcePosition: "right",
      },
      {
        id: "2",
        type: "selectorNode",
        data: { onChange: onChange, color: initBgColor },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: "3",
        type: "output",
        data: { label: "Output A" },
        position: { x: 650, y: 25 },
        targetPosition: "left",
      },
      {
        id: "4",
        type: "output",
        data: { label: "Output B" },
        position: { x: 650, y: 100 },
        targetPosition: "left",
      },
      {
        id: "textnode-1",
        type: "textUpdater",
        position: { x: 100, y: -50 },
        data: { label: "testing" },
      },
      {
        id: "handle-1",
        type: "myhandle",
        position: { x: 0, y: 0 },
        data: { label: "my handle" },
      },
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: false,
        style: { stroke: "#fff" },
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        animated: false,
        style: { stroke: "#fff" },
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        animated: false,
        style: { stroke: "#f51767" },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  // ReactFlow cannot be wrapped inside form element - try wrapped in form provider and use form in each custom nodes ?
  // simply use raect flow provider
  // or we need to use Zustand to store the current form state ?
  return (
    <FormProvider {...methods}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
        {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "input") return "#0041d0";
          if (n.type === "selectorNode") return bgColor;
          if (n.type === "output") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "selectorNode") return bgColor;
          return "#fff";
        }}
      /> */}

        <Panel position="top-right">
          <Button />
        </Panel>
        <Controls />
      </ReactFlow>
    </FormProvider>
  );
};

export default CustomNodeFlow;