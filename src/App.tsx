import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import CustomNodeFlow from "./components/custom-flow";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <ReactFlowProvider>
      <div className="container">
        <CustomNodeFlow />
      </div>

      <Sidebar />
    </ReactFlowProvider>
  );
}

export default App;
