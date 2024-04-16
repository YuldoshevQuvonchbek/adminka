import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/main-layout";
import { Main_pages } from "./router/main-router";
import { UseSkror } from "./hook/useSkror";
import Login from "./pages/login/login";

function App() {
  return (
    <>
      <UseSkror />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<MainLayout />}>
          {Main_pages.map(({ component: Component, path }) => (
            <Route
              key={path || "/"}
              path={path || "/"}
              element={<Component />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
