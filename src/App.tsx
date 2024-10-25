import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/errorBoundary";
import Loader from "./components/loader/loader";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = lazy(() => import("./pages/homepage"));

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={"/"} element={<HomePage/>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </div>  );
}

export default App;
