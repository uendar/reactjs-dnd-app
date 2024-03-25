import "./App.css";
import React, { Suspense } from "react";
import Loader from "./components/Loader/Loader";
const MainPage = React.lazy(() => import("./pages/MainApp"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <MainPage />
      </Suspense>
    </div>
  );
}

export default App;
