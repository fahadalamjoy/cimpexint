import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import CustomerById from "./pages/CustomerById";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={
              <ProotectedRoute>
                <Sales />
              </ProotectedRoute>
            }
          />

          <Route
            path="/sales"
            element={
              <ProotectedRoute>
                <Sales />
              </ProotectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProotectedRoute>
                <Home />
              </ProotectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProotectedRoute>
                <Search />
              </ProotectedRoute>
            }
          />
          
          <Route
            path="/customers"
            element={
              <ProotectedRoute>
                <Customers />
              </ProotectedRoute>
            }
          />
          <Route
            path="/find-id/:id"
            element={
              <ProotectedRoute>
                <CustomerById/>
              </ProotectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProotectedRoute({ children }) {
  if (localStorage.getItem("pos-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
