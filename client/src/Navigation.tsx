import { Routes, Route, useLocation, useNavigate } from "react-router";
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
import { useEffect, useRef } from "react";
import { User } from "./utils/types";
import { RootState } from "./redux/store";
import StoryPage from "./pages/story/StoryPage";

const Navigation = () => {
  const user = useSelector<RootState>((state) => state.auth.user) as User;
  const location = useLocation();
  const isStartPage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";
  const navigate = useNavigate();

  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, [location]);

  useEffect(() => {
    if (!user && !isAuthPage && location.pathname !== "/terms") {
      navigate("/");
    }
  }, [user, navigate, isAuthPage, location.pathname]);

  return (
    <>
      {user ? (
        <>
          <Header loggedIn={true} />
          <NavBar user={user} />
          <main ref={mainContentRef} tabIndex={-1}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/createstory" element={<CreateStoryPage />} />
              <Route path="/contribute" element={<ContributeToStoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/story/:id" element={<StoryPage />} />
              <Route path="/stories" element={<PublicStorysPage />} />
            </Routes>
          </main>
        </>
      ) : (
        <>
          {!isStartPage && <Header loggedIn={false} />}
          <main ref={mainContentRef} tabIndex={-1}>
            <Routes>
              <Route index element={<StartPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
};

export default Navigation;
