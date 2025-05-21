
import React, { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  XCircle,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch("https://my-project-932b.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to send message");

      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        loading: false,
        error:
          error.message ||
          "There was an error submitting the form. Please try again.",
        success: false,
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 px-4 relative overflow-hidden">
  
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-800 mb-4">
            Let's Connect
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Have a question or want to work together? Drop us a message and we’ll reply as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-slate-800 font-medium text-base">contact@restaurant.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-slate-800 font-medium text-base">+1 234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-slate-800 font-medium text-base">Muzaffarpur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6"
          >
            {status.error && (
              <div className="p-4 bg-red-100 border border-red-200 rounded-xl text-red-700 text-sm">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="p-4 bg-green-100 border border-green-200 rounded-xl text-green-700 text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-1">
                  <User size={16} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-1">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-1">
                  <MessageSquare size={16} /> Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-1">
                  <MessageSquare size={16} /> Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {status.loading ? (
                "Sending..."
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
