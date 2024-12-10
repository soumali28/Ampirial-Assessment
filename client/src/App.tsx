import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CreateOffer from "./pages/Recruiter/CreateOffer.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-offer" element={<CreateOffer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;