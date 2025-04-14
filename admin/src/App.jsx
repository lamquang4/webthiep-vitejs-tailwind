import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Toaster />
      <Layout />
    </Router>
  );
}

export default App;
