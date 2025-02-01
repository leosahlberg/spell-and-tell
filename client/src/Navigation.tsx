import { Routes, Route, useLocation } from "react-router";
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
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { User } from "./utils/types";
import { RootState } from "./redux/store";

const Navigation = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const data = useSelector<RootState>((state) => state.auth.user) as User;
  const location = useLocation();
  const isStartPage = location.pathname === "/";

  useEffect(() => {
    setLoggedInUser(data);
  }, [data]);

  return (
    <>
      {loggedInUser != null ? (
        <>
          <Header loggedIn={loggedInUser != null} />
          <NavBar user={data} />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/createstory" element={<CreateStoryPage />} />
            <Route path="/contribute" element={<ContributeToStoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/storys" element={<PublicStorysPage />} />
          </Routes>
        </>
      ) : (
        <>
          {!isStartPage && <Header loggedIn={loggedInUser != null} />}
          <Routes>
            <Route index element={<StartPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Navigation;
