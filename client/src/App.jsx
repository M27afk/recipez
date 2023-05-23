import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeSearch from "./pages/RecipeSearch";
import Recipe from "./pages/Recipe";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={user ? <RecipeSearch /> : <Home />} />
        <Route path="/about" element={user ? <About /> : <Home />} />
        <Route path="/profile" element={user ? <Profile /> : <Home />} />
        <Route path="/recipes/:id" element={user ? <Recipe /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
