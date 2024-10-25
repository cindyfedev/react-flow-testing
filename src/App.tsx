import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import CustomNodeFlow from "./components/custom-flow";
import { Sidebar } from "./components/sidebar";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});
function App() {
  return (
    <MantineProvider theme={theme}>
      <ReactFlowProvider>
        <div className="container">
          <CustomNodeFlow />
        </div>

        <Sidebar />
      </ReactFlowProvider>
    </MantineProvider>
  );
}

export default App;
