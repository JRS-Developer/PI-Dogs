import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Principal from "./pages/Principal";
import BreedInfo from "./pages/BreedInfo";
import NotFound from "./pages/NotFound";
import CreateBreed from "./pages/CreateBreed";
import NavBar from "./components/NavBar/NavBar";
import { Provider } from "use-http";

const { REACT_APP_API_URL } = process.env;

function App() {
  return (
    <Provider url={REACT_APP_API_URL}>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/" element={<NavBar />}>
            <Route path="home" element={<Principal />} />
            <Route path="breed/:idBreed" element={<BreedInfo />} />
            <Route path="create" element={<CreateBreed />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
