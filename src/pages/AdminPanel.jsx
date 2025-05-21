
import React, { useState, useEffect } from "react";
import { FaBars, FaPlus, FaList, FaTachometerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import AddItem from "./admin/AddItem";
import ShowItems from "./admin/ShowItem";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/admin-login");
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900">
      
      <aside
        className={`bg-white/70 backdrop-blur-lg border-r border-gray-300 w-72 p-8 shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold mb-12 mt-14 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-4 text-lg">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
              activeSection === "dashboard"
                ? "bg-gradient-to-r from-red-500 to-purple-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaTachometerAlt className="text-xl" /> Dashboard
          </button>
          <button
            onClick={() => setActiveSection("add")}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
              activeSection === "add"
                ? "bg-gradient-to-r from-red-500 to-purple-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaPlus className="text-xl" /> Add Item
          </button>
          <button
            onClick={() => setActiveSection("show")}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
              activeSection === "show"
                ? "bg-gradient-to-r from-red-500 to-purple-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaList className="text-xl" /> Show Items
          </button>
        </nav>
      </aside>

     
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <FaBars size={24} />
          </button>
        </div>

        
        <div
          className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 shadow-md"
          data-aos="fade-up"
        >
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "add" && <AddItem />}
          {activeSection === "show" && <ShowItems />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
