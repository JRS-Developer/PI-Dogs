import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Start from "./pages/Start";
import Principal from "./pages/Principal";
import BreedInfo from "./pages/BreedInfo";
import CreateBreed from "./pages/CreateBreed";
import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer'
import { Provider } from "use-http";
import "./styles/App.scss";

const { REACT_APP_API_URL } = process.env;

function App() {
  return (
    <Provider url={REACT_APP_API_URL}>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <main>
                  <Outlet />
                </main>
                <Footer />
              </>
            }
          >
            <Route path="home" element={<Principal />} />
            <Route path="breed/:idBreed" element={<BreedInfo />} />
            <Route path="create" element={<CreateBreed />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
