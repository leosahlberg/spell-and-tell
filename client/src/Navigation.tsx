import { BrowserRouter, Routes, Route } from "react-router";
import StartPage from "./pages/start/StartPage";
import HomePage from "./pages/home/HomePage";
import LogInPage from "./pages/login/LogInPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import CreateStoryPage from "./pages/createStory/CreateStoryPage";
import ContributeToStoryPage from "./pages/contributeToStory/ContributeToStoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";
import TermsPage from "./pages/terms/TermsPage";
import PublicStorysPage from "./pages/publicStorys/PublicStorysPage";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/createstory" element={<CreateStoryPage />} />
        <Route path="/contribute" element={<ContributeToStoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/storys" element={<PublicStorysPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
