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
          {Main_pages.map((route) => (
            <Route
              key={route.path || "/"}
              path={route.path || "/"}
              element={route.component}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
