import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import MembershipPage from "./pages/MemberShipPage";
import TrainersPage from "./pages/TrsinersPage";
import JoinUs from "./pages/JoinUs";
import ContactPage from "./pages/ContactPage";
import Facility from "./pages/Facility";

import { Header } from "./components/Header";
import ScrollManager from "./components/scrollManager";

function App() {
  return (
    <>
      <ScrollManager />

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/JoinUs" element={<JoinUs />} />
        <Route path="/facility" element={<Facility />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
