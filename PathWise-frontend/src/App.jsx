import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';

import CareerPathPage from './components/CareerPath';
import SelectPath from './components/SelectPath';
import { Courselection } from './components/Courselection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Roles from './components/Roles';
import Skills from './components/Skills';
import Assestment from './components/Assestment';
import Result from './components/Result';
import Test from './components/Test';
import Project from './components/Projects';
import HighSchoolPath from './components/HighSchoolPath';

// Page transition animation wrapper
const AnimatedPageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// Layout wrapper with Navbar + Footer, used for the marketing landing page
const MainLayout = () => (
  <>
    <Navbar />
    <AnimatedPageWrapper>
      <Outlet />
    </AnimatedPageWrapper>
    <Footer />
  </>
);

// Route definitions with animated transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Marketing site - Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Onboarding + product flow - each screen owns its own header */}
        <Route path="/begin" element={<AnimatedPageWrapper><Onboarding /></AnimatedPageWrapper>} />
        <Route path="/select-path" element={<AnimatedPageWrapper><SelectPath /></AnimatedPageWrapper>} />
        <Route path="/course-selection" element={<AnimatedPageWrapper><Courselection /></AnimatedPageWrapper>} />
        <Route path="/highschool-path" element={<AnimatedPageWrapper><HighSchoolPath /></AnimatedPageWrapper>} />
        <Route path="/career-path" element={<AnimatedPageWrapper><CareerPathPage /></AnimatedPageWrapper>} />
        <Route path="/job-roles" element={<AnimatedPageWrapper><Roles /></AnimatedPageWrapper>} />
        <Route path="/skills" element={<AnimatedPageWrapper><Skills /></AnimatedPageWrapper>} />
        <Route path="/assessment" element={<AnimatedPageWrapper><Assestment /></AnimatedPageWrapper>} />
        <Route path="/result" element={<AnimatedPageWrapper><Result /></AnimatedPageWrapper>} />
        <Route path="/test" element={<AnimatedPageWrapper><Test /></AnimatedPageWrapper>} />
        <Route path="/project-page" element={<AnimatedPageWrapper><Project /></AnimatedPageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
