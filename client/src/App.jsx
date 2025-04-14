import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Layout from "./layout";
function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_KEY}>
        <Toaster />
        <Layout />
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
