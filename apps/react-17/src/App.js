import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopt me</Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
