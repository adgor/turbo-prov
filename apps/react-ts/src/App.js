import { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const theme = useState("rebeccapurple");

  return (
    <ThemeContext.Provider value={theme}>
      <Suspense fallback={<h2>TODO: Hero Info bout app</h2>}>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt me</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
