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
        // Store user data in localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else if (!isLogin) {
          // For registration, store the username from form
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
    <main className="relative min-h-screen overflow-hidden bg-[#081016] text-[#f4efe7]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#c48d3a]/12 blur-3xl" />
        <div className="absolute right-[-7rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-[#8fb9aa]/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[18%] h-[28rem] w-[28rem] rounded-full bg-[#5a6a7a]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <section className="hidden lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b8a995]">Database Agent</p>
            <h1 className="font-display mt-4 max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Secure access to your analytics workspace.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#ddd6ca]">
              Sign in to continue querying data, reviewing generated SQL, and sharing chart-ready insights with your team.
            </p>
            <div className="mt-8 space-y-3 text-[#ddd6ca]">
              <div className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f1c27d]" /><span>Ask questions in plain language and get SQL you can inspect.</span></div>
              <div className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f1c27d]" /><span>Convert raw query output into clear, decision-ready visuals.</span></div>
              <div className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f1c27d]" /><span>Keep analysis fast, transparent, and easy to share.</span></div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#0d151c]/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#b8a995]">{isLogin ? 'Login' : 'Register'}</p>
                <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-white">
                  {isLogin ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="mt-2 text-sm text-[#d2c9bd]">
                  {isLogin ? 'Sign in to continue to your workspace.' : 'Start using Database Agent in minutes.'}
                </p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#e8dfd3] transition hover:border-white/25 hover:bg-white/5"
              >
                Back Home
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-medium text-[#ded5c9]">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-[#9faab6] outline-none transition focus:border-[#f1c27d]/60 focus:ring-2 focus:ring-[#f1c27d]/30"
                    placeholder="Enter your username"
                  />
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#ded5c9]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-[#9faab6] outline-none transition focus:border-[#f1c27d]/60 focus:ring-2 focus:ring-[#f1c27d]/30"
                    placeholder="Enter your email"
                  />
                </div>
              )}

              {isLogin && (
                <div>
                  <label htmlFor="usernameOrEmail" className="mb-2 block text-sm font-medium text-[#ded5c9]">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleInputChange}
                    required={isLogin}
                    className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-[#9faab6] outline-none transition focus:border-[#f1c27d]/60 focus:ring-2 focus:ring-[#f1c27d]/30"
                    placeholder="Enter username or email"
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#ded5c9]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-[#9faab6] outline-none transition focus:border-[#f1c27d]/60 focus:ring-2 focus:ring-[#f1c27d]/30"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-400/25 bg-red-500/10 p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#f1c27d] px-6 py-3.5 text-sm font-semibold text-[#11151b] transition hover:bg-[#f5d39e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5 text-center">
              <button
                onClick={toggleMode}
                className="text-sm font-medium text-[#d9d0c4] transition hover:text-white"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Auth;