import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    login(form.email, form.password);
    navigate("/dashboard");
  };

  // Magic card mouse tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}>
      
      {/* Animated background blobs */}
      <div className="absolute top-[-10rem] right-[-10rem] w-80 h-80 rounded-full opacity-20"
        style={{ 
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite"
        }} />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-80 h-80 rounded-full opacity-20"
        style={{ 
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite 2s"
        }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ 
              background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              boxShadow: "0 10px 40px rgba(139, 92, 246, 0.3)"
            }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2"
            style={{ 
              background: "linear-gradient(90deg, #ffffff 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
            StockMaster
          </h1>
          <p style={{ color: "#9ca3af" }}>Sign in to your account</p>
        </div>

        {/* Magic Card Container */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)"
          }}>
          
          {/* Magic gradient spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.8 : 0,
              background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 100%)`
            }} />
          
          {/* Border glow effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2), transparent 100%)`
            }} />

          {/* Form Content */}
          <div className="relative z-10 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#d1d5db" }}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#d1d5db" }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer" style={{ color: "#9ca3af" }}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded mr-2"
                    style={{ accentColor: "#8b5cf6" }}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="transition-colors duration-200" 
                  style={{ color: "#a78bfa" }}
                  onMouseOver={(e) => e.target.style.color = "#c4b5fd"}
                  onMouseOut={(e) => e.target.style.color = "#a78bfa"}>
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 15px 40px rgba(139, 92, 246, 0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 30px rgba(139, 92, 246, 0.3)";
                }}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4" style={{ background: "rgba(15, 23, 42, 0.8)", color: "#6b7280" }}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d1d5db"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d1d5db"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm" style={{ color: "#9ca3af" }}>
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="font-medium transition-colors duration-200"
                style={{ color: "#a78bfa" }}
                onMouseOver={(e) => e.target.style.color = "#c4b5fd"}
                onMouseOut={(e) => e.target.style.color = "#a78bfa"}>
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        input::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Login;