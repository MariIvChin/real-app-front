import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import MyCards from "./components/myCards";

import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import SignOut from "./components/signOut";
import SignUpBiz from "./components/SignUpBiz";
import CreateCard from "./components/createCard";

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-out" element={<SignOut />} />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
