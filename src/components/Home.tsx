import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const painStats = [
  {
    value: 'Ready',
    label: 'Connect your SQL database and start questioning immediately.',
    note: 'Instant Setup',
  },
  {
    value: 'Automated',
    label: 'Data is fetched, processed, and analyzed with zero manual effort.',
    note: 'Hands-off',
  },
  {
    value: 'Visual',
    label: 'Complex datasets are automatically transformed into clean charts.',
    note: 'Seamless',
  },
];

const workflowSteps = [
  {
    title: 'Text-to-SQL Agent',
    body: 'The agent understands your natural language and database schema to write precise, optimized SQL queries automatically.',
    gradient: 'from-[#2563EB] to-[#3B82F6]',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Analytical Insight Agent',
    body: 'Beyond raw rows, the agent performs deep statistical analysis to provide human-readable insights and trends from your data.',
    gradient: 'from-[#EA580C] to-[#FB923C]',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Visual Visualization Agent',
    body: 'Transforming analysis into action. The agent crafts professional-grade charts and dashboards based on the discovered insights.',
    gradient: 'from-[#059669] to-[#10B981]',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
];

const visualizationPrinciples = [
  'Context-aware chart selection.',
  'Deep analytical summaries.',
  'Clean, readable data tables.',
  'Instant boardroom-ready exports.',
];

const chartBars = [
  { label: 'Mon', value: 34 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 48 },
  { label: 'Thu', value: 71 },
  { label: 'Fri', value: 64 },
  { label: 'Sat', value: 29 },
  { label: 'Sun', value: 41 },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-primary">
      {/* Navigation Layered on Hero */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-soft-lg' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
               <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg' : 'bg-white shadow-xl group-hover:bg-primary group-hover:scale-105'}`}>
                  <svg className={`w-5 h-5 transition-colors ${scrolled ? 'text-white' : 'text-primary group-hover:text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <ellipse cx="12" cy="6" rx="7" ry="3" />
                    <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                    <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
                  </svg>
               </div>
               <span className={`font-black text-xl tracking-tighter transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>DatabaseAgent</span>
            </div>

            <div className={`hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>
              <a href="#about" className="hover:text-cta transition-colors">Discover</a>
              <a href="#visuals" className="hover:text-cta transition-colors">Features</a>
              <a href="#" className="hover:text-cta transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/auth?mode=login')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600' : 'text-white hover:text-white/80'}`}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/auth?mode=register')}
              className={`btn px-6 py-2.5 text-xs uppercase font-black tracking-widest transition-all ${scrolled ? 'btn-primary' : 'bg-white/10 text-white border border-white hover:bg-white hover:text-primary shadow-2xl shadow-black/10'}`}
            >
              Start for Free
            </button>
          </div>
        </div>
      </nav>

      {/* High-Impact Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#6366F1]">
        {/* Animated Background Textures */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/20 rounded-full blur-[100px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[100px] animate-blob [animation-delay:2s]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto pt-32 md:pt-40">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 animate-fade-in-up leading-tight">
            Plain text to insights. <br />
            <span className="text-white/70">Visualized in seconds.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100 leading-relaxed font-sans">
            Autonomous data analysis from prompt to chart. Describe your query, and we'll handle the rest—<span className="text-white font-black underline decoration-white decoration-4 underline-offset-4">no SQL required.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-200 mb-20 md:mb-32">
             <button 
               onClick={() => navigate('/auth?mode=register')}
               className="btn bg-white text-blue-700 px-10 py-5 text-lg shadow-2xl shadow-black/20 hover:scale-105 active:scale-95"
             >
               TRY FOR FREE
             </button>
             <button 
               className="btn bg-transparent border-2 border-white/40 text-white px-10 py-5 text-lg hover:bg-white/10 hover:border-white transition-all"
             >
               BOOK A DEMO
             </button>
          </div>
        </div>

        {/* Hero Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto text-white translate-y-1" viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120V40.2373C1440 40.2373 1080 0 720 0C360 0 0 40.2373 0 40.2373V120Z" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-slate-50 border-bottom border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">The Context</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Analysis is currently broken.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-[2rem] shadow-soft-xl border border-slate-100 flex flex-col justify-between group hover:border-amber-200 transition-colors">
              <div>
                <div className="text-5xl font-black text-amber-600 mb-6 transition-transform group-hover:scale-110">80%</div>
                <h4 className="text-xl font-black mb-4 text-slate-800">The Wrangler's Trap</h4>
                <p className="text-slate-500 font-bold leading-relaxed text-sm">
                  Data teams spend 80% of their time collecting and cleaning data, leaving only 20% for actual strategic analysis.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">Source: Tableau Research</div>
            </div>

            <div className="p-10 bg-white rounded-[2rem] shadow-soft-xl border border-slate-100 flex flex-col justify-between group hover:border-indigo-200 transition-colors">
              <div>
                <div className="text-5xl font-black text-indigo-600 mb-6 transition-transform group-hover:scale-110">30%</div>
                <h4 className="text-xl font-black mb-4 text-slate-800">The Discovery Gap</h4>
                <p className="text-slate-500 font-bold leading-relaxed text-sm">
                  Knowledge workers lose 30% of their total productivity just searching for the right data points within their organization.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">Source: Forrester Study</div>
            </div>

            <div className="p-10 bg-white rounded-[2rem] shadow-soft-xl border border-slate-100 flex flex-col justify-between group hover:border-rose-200 transition-colors">
              <div>
                <div className="text-5xl font-black text-rose-600 mb-6 transition-transform group-hover:scale-110">$12.9M</div>
                <h4 className="text-xl font-black mb-4 text-slate-800">The Quality Drain</h4>
                <p className="text-slate-500 font-bold leading-relaxed text-sm">
                  Poor data quality and manual errors cost organizations an average of nearly $13 million annually in lost opportunities.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">Source: Gartner / IBM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - XOOM Styled Cards */}
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
           <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Our Solution</span>
           <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-8 tracking-tight">
             How DatabaseAgent transforms <br /> your business analysis
           </h2>
           <p className="text-lg text-slate-500 font-bold leading-relaxed mb-20 max-w-2xl mx-auto">
             From raw datasets to board-ready insights. We eliminate technical bottlenecks with three specialized autonomous agents.
           </p>

           <div className="grid lg:grid-cols-3 gap-8">
              {workflowSteps.map((step, i) => (
                <div 
                  key={i} 
                  className={`relative p-12 rounded-3xl bg-gradient-to-br ${step.gradient} text-white shadow-2xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500`}
                >
                   {/* Icon Container */}
                   <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                   </div>
                   
                   <h4 className="text-2xl font-black mb-6 tracking-tight leading-tight">{step.title}</h4>
                   <p className="text-white/80 font-bold leading-relaxed text-sm whitespace-pre-line">
                      {step.body}
                   </p>

                   {/* Background Decorative Element */}
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-3xl" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Product Storyline - 1-2-3 Sequential Flow */}
      <section id="visuals" className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-48">
           
           {/* STEP 01: THE INTENT */}
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="animate-fade-in-up">
                 <div className="flex items-center gap-6 mb-8">
                    <span className="text-6xl font-black text-[#1E3A8A]">01</span>
                    <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">The Intent</span>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-slate-900">Start with a <br />simple question.</h3>
                 <p className="text-lg text-slate-600 font-bold mb-10 leading-relaxed">
                   No SQL required. No schema training necessary. Just describe what you need to know in plain English and let the engine handle the technical weight.
                 </p>
                 <div className="flex items-center gap-4 py-4 border-t border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100">✓</div>
                    <span className="text-sm font-bold text-slate-500">Supports complex multi-table relationships</span>
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-3xl opacity-10" />
                 <div className="relative bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl shadow-blue-900/10">
                    <div className="flex items-center gap-2 mb-8">
                       <div className="w-3 h-3 bg-slate-200 rounded-full" />
                       <div className="w-3 h-3 bg-slate-200 rounded-full" />
                       <div className="w-3 h-3 bg-slate-200 rounded-full" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 block">Engine Input</span>
                    <p className="text-xl md:text-3xl font-bold text-slate-800 leading-relaxed italic">
                      "Show discount distribution in Northwind order details using buckets: No Discount, Up to 5%, 5-10%, Above 10%. Include bucket and count."
                    </p>
                    <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between font-sans">
                       <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identifying Schema Path...</span>
                       </div>
                       <div className="text-4xl font-black text-slate-100">AGENT 01</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* STEP 02: THE LOGIC */}
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                 <div className="absolute -inset-4 bg-orange-600/5 rounded-[3rem] blur-3xl opacity-10" />
                 <div className="relative p-2 rounded-[2.5rem] bg-white shadow-2xl shadow-orange-900/10 border border-slate-100 overflow-hidden">
                    <img src="/insights.png" alt="Intelligence Preview" className="w-full h-auto rounded-[2rem]" />
                 </div>
              </div>
              <div className="order-1 lg:order-2 animate-fade-in-up">
                 <div className="flex items-center gap-6 mb-8">
                    <span className="text-6xl font-black text-[#1E3A8A]">02</span>
                    <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] bg-orange-50 px-4 py-2 rounded-full border border-orange-100">The Logic</span>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-slate-900">Autonomous <br />data interpretation.</h3>
                 <p className="text-lg text-slate-600 font-bold mb-10 leading-relaxed">
                   DatabaseAgent doesn't just return rows. It analyzes trends, identifies outliers, and crafts a logical summary of your data's true story.
                 </p>
                 <div className="space-y-4">
                    {['Trend Analysis & Narrative Generation', 'Autonomous Anomaly Detection'].map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                         <span className="text-sm font-black text-slate-700">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* STEP 03: THE ANSWER */}
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="animate-fade-in-up">
                 <div className="flex items-center gap-6 mb-8">
                    <span className="text-6xl font-black text-[#1E3A8A]">03</span>
                    <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">The Answer</span>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-slate-900">Instant, accurate <br />visualizations.</h3>
                 <p className="text-lg text-slate-600 font-bold mb-10 leading-relaxed">
                   The end result is a high-fidelity visualization, rendered live from your database. Ready for the boardroom, without the manual effort.
                 </p>
                 <div className="space-y-4">
                   {[
                     'Dynamic Chart Selection Engine',
                     'Live Database Rendering'
                   ].map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                         <span className="text-sm font-black text-slate-700">{p}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-3xl opacity-10" />
                 <div className="relative p-2 rounded-[2.5rem] bg-white shadow-2xl shadow-blue-900/20 border border-slate-100 overflow-hidden">
                    <img src="/visuals_image.png" alt="Visual Intelligence Preview" className="w-full h-auto rounded-[2rem]" />
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* Unified Final CTA & Footer */}
      <footer className="relative py-32 px-6 bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#6366F1] overflow-hidden">
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[150px] rounded-full animate-blob" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/10 blur-[150px] rounded-full animate-blob [animation-delay:2s]" />

         <div className="max-w-7xl mx-auto relative z-10">
            {/* CTA Part */}
            <div className="max-w-4xl mx-auto text-center mb-32">
               <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-none tracking-tight">
                  Scale your analysis <br /> 
                  for free.
               </h2>
               <p className="text-white/80 font-bold mb-12 text-lg max-w-xl mx-auto">Join the new standard of autonomous data intelligence. No SQL, no bottlenecks, just insights.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate('/auth?mode=register')} className="btn px-12 py-5 bg-white text-blue-700 text-xl shadow-2xl shadow-black/20 hover:scale-105 transition-all">Start Free Trial</button>
                  <button className="btn px-12 py-5 bg-white/10 border border-white/20 text-white text-xl hover:bg-white/20 transition-all">Learn More</button>
               </div>
            </div>

            {/* Footer Columns Part */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24 pt-24 border-t border-white/10">
               <div className="col-span-2">
                  <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => navigate('/')}>
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-700 shadow-lg group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <ellipse cx="12" cy="6" rx="7" ry="3" />
                        <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                        <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
                        </svg>
                     </div>
                     <span className="font-black text-2xl tracking-tighter text-white">DatabaseAgent</span>
                  </div>
                  <p className="text-white/70 font-bold text-base leading-relaxed max-w-sm mb-10">
                     The professional interface for your database. Turning natural language into autonomous analytics and visual answers.
                  </p>
                  <div className="flex items-center gap-4 text-white/50">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white transition-all cursor-pointer">
                        <div className="w-3 h-3 bg-current rounded-sm" />
                        </div>
                     ))}
                  </div>
               </div>
               
               {[
                  { t: 'Product', l: ['Agent Intelligence', 'Visualization', 'Security', 'Database Connect'] },
                  { t: 'Company', l: ['About Us', 'Contact', 'Docs', 'Status'] },
                  { t: 'Legal', l: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] }
               ].map((col, i) => (
                  <div key={i}>
                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-white/40">{col.t}</h5>
                     <ul className="space-y-5 font-bold text-sm text-white/70">
                        {col.l.map(link => (
                        <li key={link}>
                           <a href="#" className="hover:text-white transition-all inline-flex items-center group">
                              {link}
                              <svg className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                           </a>
                        </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  © 2026 DatabaseAgent — Autonomous Data Analysis.
               </p>
               <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">System Live</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;