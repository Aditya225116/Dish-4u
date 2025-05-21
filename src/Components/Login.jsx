import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && !formData.FullName.trim()) {
      newErrors.FullName = "Full name is required";
    }
    if (!formData.Email.trim()) {
      newErrors.Email = "Email is required";
    }
    if (isSignup) {
      if (!formData.Phone.trim()) {
        newErrors.Phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(formData.Phone)) {
        newErrors.Phone = "Enter a valid 10-digit phone number";
      }
    }
    if (!formData.Password) {
      newErrors.Password = "Password is required";
    } else if (formData.Password.length < 6) {
      newErrors.Password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      let res;
      if (isSignup) {
        res = await axios.post("https://my-project-932b.onrender.com/api/signup", formData);
        setIsSignup(false);
      } else {
        res = await axios.post("https://my-project-932b.onrender.com/api/login", formData);
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          window.location.reload();
        }
      }

      setFormData({ FullName: "", Email: "", Phone: "", Password: "" });
      setErrors({});
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong. Try again.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.FullName && (
                <p className="text-red-500 text-sm">{errors.FullName}</p>
              )}
            </>
          )}

          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm">{errors.Email}</p>
          )}

          {isSignup && (
            <>
              <input
                type="tel"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.Phone && (
                <p className="text-red-500 text-sm">{errors.Phone}</p>
              )}
            </>
          )}

          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password}</p>
          )}

          {apiError && (
            <p className="text-red-600 text-sm text-center font-medium">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 font-medium hover:underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setFormData({ FullName: "", Email: "", Phone: "", Password: "" });
              setErrors({});
              setApiError("");
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
