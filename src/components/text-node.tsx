import { useCallback, useEffect, useState } from "react";
import { Handle, Position, useEdges } from "@xyflow/react";
import { useFormContext, Controller } from "react-hook-form";

// const handleStyle = { left: 10 };

// Testing if we can use react hook form methods here to register inputs

// hook.js:608 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.

function TextUpdaterNode({ data, isConnectable, setNodes }) {
  const { register, control } = useFormContext(); // retrieve all hook methods

  // console.log(data, "what is data in TextUpdateNode");
  const [value, setValue] = useState(0);
  const onInputChange = useCallback((evt) => {
    setValue(evt.target.value);
  }, []);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [selectedFruit, setSelectedFruit] = useState("");

  const handleSelectChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  // if selector is banana then add new node

  // You have to create a new data object on a node to notify React Flow about data changes.

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {/* <label htmlFor="text">Text:</label>
        <input
          {...register("mytext")}
          id="text"
          // name="text"
          // onChange={onChange}
          className="nodrag"
        /> */}

        <Controller
          control={control}
          name="text"
          // need to provide initial value otherwise will get react hook warning error above
          render={({ field }) => (
            <>
              <label htmlFor="text">Text Label is: {data.label}</label>
              <p>Field Value is {field.value}</p>

              {/* WHy on earth 2 values above data.label is one character short of field.value are different  */}
              <input
                id="text"
                className="nodrag"
                onChange={(e) => {
                  setNodes((nds) =>
                    nds.map((node) => {
                      if (node.id === "textnode-1") {
                        // it's important that you create a new node object
                        // in order to notify react flow about the change
                        // https://reactflow.dev/examples/nodes/update-node
                        return {
                          ...node,
                          data: {
                            ...node.data,
                            label: e.target.value,
                          },
                        };
                      }

                      return node;
                    })
                  );

                  field.onChange(e);
                }}
                value={field.value ?? ""}
              />
            </>
          )}
        />
      </div>

      <Controller
        control={control}
        name="myslider"
        // need to provide initial value otherwise will get react hook warning error above
        render={({ field: { onChange, value = 0 } }) => (
          <>
            <label>value: {value}</label>
            <input
              className="nodrag"
              type="range"
              min={0}
              max={100}
              onChange={onChange}
              value={value}
            />
          </>
        )}
      />

      <div>
        <Controller
          control={control}
          name="fruits"
          // need to provide initial value otherwise will get react hook warning error above
          render={({ field: { onChange, value = "" } }) => (
            <>
              <label htmlFor="fruits">Choose a fruit:</label>
              <select id="fruits" value={value} onChange={onChange}>
                <option value="">--Select a fruit--</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
                <option value="mango">Mango</option>
                <option value="orange">Orange</option>
              </select>
            </>
          )}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
