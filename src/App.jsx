import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import WorkoutPlanner from "./pages/WorkoutPlanner";
import DietPlanner from "./pages/DietPlanner";
import Equipment from "./pages/Equipment";
import Clients from "./pages/Clients";
import GoalPlanner from "./pages/GoalPlanner";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("loggedInUser");
    if (isLoggedIn === "true" && email) {
      setUser({ email });
    }
  }, []);

  const handleAuth = (email) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", email);
    setUser({ email });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-900 text-white p-4 flex gap-4 items-center">
        <Link to="/" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/workout-planner" className="hover:text-yellow-300">Workout</Link>
        <Link to="/diet-planner" className="hover:text-yellow-300">Diet</Link>
        <Link to="/clients" className="hover:text-yellow-300">Clients</Link>
        <Link to="/equipment" className="hover:text-yellow-300">Equipment</Link>
        <Link to="/goal-planner" className="hover:text-yellow-300">Goal Planner</Link>

        <div className="ml-auto">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-yellow-300 mr-4">Login</Link>
              <Link to="/register" className="hover:text-yellow-300">Register</Link>
            </>
          ) : (
            <>
              <span className="mr-4 text-sm text-gray-300">👋 {user.email}</span>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/workout-planner" element={user ? <WorkoutPlanner /> : <Navigate to="/login" />} />
          <Route path="/diet-planner" element={user ? <DietPlanner /> : <Navigate to="/login" />} />
          <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
          <Route path="/equipment" element={user ? <Equipment /> : <Navigate to="/login" />} />
          <Route path="/goal-planner" element={user ? <GoalPlanner /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
