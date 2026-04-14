import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

const Auth: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const isLoginModeFromQuery = mode !== 'register';
  const [isLogin, setIsLogin] = useState(isLoginModeFromQuery);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usernameOrEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(isLoginModeFromQuery);
  }, [isLoginModeFromQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const body = isLogin
        ? { username_or_email: formData.usernameOrEmail, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else if (!isLogin) {
          localStorage.setItem('user', JSON.stringify({ username: formData.username, email: formData.email }));
        }
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/chat');
      } else {
        setError(data.message);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const nextIsLogin = !isLogin;
    setIsLogin(nextIsLogin);
    setSearchParams({ mode: nextIsLogin ? 'login' : 'register' });
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      usernameOrEmail: ''
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#6366F1] text-primary selection:bg-cta/10 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Absolute Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 group text-white/70 hover:text-white transition-all z-50 text-xs font-black uppercase tracking-[0.2em]"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span>Back</span>
      </button>

      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-200/10 blur-[120px] rounded-full animate-blob [animation-delay:2s]" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Branding/Info Side */}
        <div className="hidden lg:block space-y-10 animate-fade-in-up">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xl">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-white">DatabaseAgent</span>
          </div>

          <h2 className="text-5xl font-black leading-tight text-white tracking-tight">
            Autonomous analysis <br />
            for <span className="text-white/60">modern teams.</span>
          </h2>
          
          <p className="text-lg text-white/70 font-bold leading-relaxed max-w-sm">
            The professional way to talk to your database. Write queries, find trends, and create visualizations in seconds.
          </p>

          <div className="space-y-6 pt-4">
            {[
              'Instant natural language to SQL conversion',
              'Deeply contextual query explanations',
              'One-click professional visualizations'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card bg-white p-10 md:p-12 shadow-soft-2xl animate-fade-in-up delay-100">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
               <div className="w-12 h-12 bg-cta rounded-xl flex items-center justify-center shadow-cta/20" onClick={() => navigate('/')}>
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <ellipse cx="12" cy="6" rx="7" ry="3" />
                    <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                    <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
                  </svg>
               </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Start for free'}
            </h1>
            <p className="text-slate-500 font-bold text-sm">
              {isLogin ? 'Enter your details to access your workspace.' : 'Create your account to start analyzing today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 outline-none transition-all duration-300"
                  placeholder="johndoe"
                />
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 outline-none transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
            )}

            {isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Username or Email</label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                  required={isLogin}
                  className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 outline-none transition-all duration-300"
                  placeholder="Email or username"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 animate-fade-in">
                <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-xs font-black text-rose-600 uppercase tracking-wide">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 text-lg shadow-xl shadow-cta/20 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'Sign in to platform' : 'Create free account'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col items-center gap-6">
            <button
              onClick={toggleMode}
              className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-cta transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already member? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;