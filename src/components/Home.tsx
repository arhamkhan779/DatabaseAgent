import React from 'react';
import { useNavigate } from 'react-router-dom';

const painStats = [
  {
    value: '80%',
    label: 'of data scientists’ time can go into collecting, cleaning, and organizing data',
    note: 'That is effort lost before analysis even starts.',
  },
  {
    value: '30%',
    label: 'of knowledge-worker time can go into looking for data',
    note: 'Repeated searching is wasted capacity across the team.',
  },
  {
    value: '$12.9M',
    label: 'average annual cost of poor data quality per organization',
    note: 'Bad data drives rework in queries, analysis, and reporting.',
  },
];

const workflowSteps = [
  {
    title: 'Ask in plain English',
    body: 'Describe the metric you need, the slice you care about, or the trend you want to compare.',
  },
  {
    title: 'Inspect the SQL',
    body: 'Review the generated query, adjust filters, and keep every step transparent before you run it.',
  },
  {
    title: 'Ship the visualization',
    body: 'Turn rows into a chart, a summary, or a dashboard-ready answer in the same flow.',
  },
];

const visualizationPrinciples = [
  'Choose the right chart for the question.',
  'Keep layouts predictable so the eye knows where to go.',
  'Use color sparingly to highlight what matters.',
  'Add context with labels, callouts, and annotations.',
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081016] text-[#f4efe7]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#c48d3a]/12 blur-3xl" />
        <div className="absolute right-[-7rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-[#8fb9aa]/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[18%] h-[28rem] w-[28rem] rounded-full bg-[#5a6a7a]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <svg className="h-5 w-5 text-[#c48d3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.24em] text-[#f4efe7]/80 uppercase">Database Agent</p>
              <p className="mt-1 text-base font-medium text-[#d9d0c4] sm:text-lg">Natural language to SQL, insights, and visualization</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-[#ddd6ca] md:flex">
            <a href="#problem" className="transition-colors hover:text-white">Problem</a>
            <a href="#solution" className="transition-colors hover:text-white">Solution</a>
            <a href="#visuals" className="transition-colors hover:text-white">Data Visualization</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth?mode=register')}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              Get started
            </button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="relative max-w-3xl">
            <div className="mb-8 flex items-center gap-4 text-base text-[#dcccad] sm:text-lg">
              <span className="h-px w-12 bg-[#c48d3a]/75" />
              <span className="font-medium tracking-[0.045em]">
                Built for teams that need fast, reliable data insights and visualizations.
              </span>
            </div>

            <h1 className="font-display max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              Stop wasting hours on SQL.
              <span className="mt-5 block text-[#f1c27d]">Ask better questions. Get instant answers.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#ddd6ca] sm:text-xl">
              The drag is not only writing the query. It is hunting for the right table,
              rewriting joins, checking edge cases, and turning raw rows into something
              a team can actually use. Database Agent collapses that work into one flow.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/auth?mode=register')}
                className="inline-flex items-center justify-center rounded-full bg-[#f1c27d] px-6 py-3.5 text-sm font-semibold text-[#11151b] transition hover:bg-[#f5d39e]"
              >
                Start free
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="#solution"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
              >
                See the workflow
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {painStats.map((stat) => (
                <div key={stat.value} className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-semibold tracking-[-0.05em] text-white">{stat.value}</div>
                  <div className="mt-2 text-sm leading-6 text-[#ddd6ca]">{stat.label}</div>
                  <div className="mt-auto pt-3 text-xs uppercase tracking-[0.18em] text-[#b8a995]">{stat.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#c48d3a]/10 via-transparent to-[#8fb9aa]/10 blur-2xl" />
            <div className="rounded-[2rem] border border-white/10 bg-[#0d151c]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#b8a995]">Live preview</p>
                  <p className="mt-1 text-lg font-semibold text-white">Revenue by region</p>
                </div>
                <div className="rounded-full border border-[#8fb9aa]/20 bg-[#8fb9aa]/10 px-3 py-1 text-xs font-medium text-[#cce4da]">
                  Ready to visualize
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#b8a995]">
                    <span>Generated SQL</span>
                    <span className="text-[#8fb9aa]">Explainable</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-[#f4efe7]">
{`SELECT region,
       SUM(revenue) AS revenue,
       COUNT(*) AS orders
FROM orders
WHERE created_at >= date_trunc('month', current_date)
GROUP BY region
ORDER BY revenue DESC;`}
                  </pre>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#ddd6ca]">
                    <span className="rounded-full bg-white/5 px-3 py-1">Review</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Adjust</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Run</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Share</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#b8a995]">Chart view</p>
                      <p className="mt-1 text-sm text-[#ddd6ca]">Sales trend over the last 7 days</p>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#ddd6ca]">Line + bars</div>
                  </div>

                  <div className="mt-5 flex h-56 items-end gap-3 rounded-2xl border border-white/10 bg-[#091017] p-4">
                    {chartBars.map((bar) => (
                      <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex h-40 w-full items-end justify-center">
                          <div
                            className="w-full max-w-[2.1rem] rounded-t-xl bg-gradient-to-t from-[#c48d3a] to-[#f1c27d] shadow-[0_0_24px_rgba(241,194,125,0.18)]"
                            style={{ height: `${bar.value}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#b8a995]">{bar.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">+18%</div>
                      <div className="mt-1 text-[#b8a995]">MoM</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">2.1s</div>
                      <div className="mt-1 text-[#b8a995]">avg. answer</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">4 charts</div>
                      <div className="mt-1 text-[#b8a995]">ready to share</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="border-t border-white/10 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b8a995]">The problem</p>
              <h2 className="font-display mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Teams do not just need SQL. They need the answer to arrive without friction.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#ddd6ca] sm:text-lg">
                Research keeps repeating the same signal: knowledge workers lose large chunks of time
                finding information, and data teams burn even more time translating vague questions into
                queries, charts, and status updates.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#b8a995]">Pain</p>
                <p className="font-display mt-3 text-xl font-semibold text-white">Rewriting the same query, again and again.</p>
                <p className="mt-3 text-sm leading-6 text-[#ddd6ca]">One typo or join change can send the whole analysis back to zero.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#b8a995]">Pain</p>
                <p className="font-display mt-3 text-xl font-semibold text-white">Results trapped in a table that nobody will read.</p>
                <p className="mt-3 text-sm leading-6 text-[#ddd6ca]">If the output is not visual, the insight stays hidden in rows.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#b8a995]">Pain</p>
                <p className="font-display mt-3 text-xl font-semibold text-white">A slow path from question to decision.</p>
                <p className="mt-3 text-sm leading-6 text-[#ddd6ca]">By the time the answer lands, the meeting has already moved on.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="border-t border-white/10 py-16 lg:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b8a995]">The solution</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                A cleaner workflow: ask, inspect, visualize, share.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#ddd6ca]">
              The product behaves like a disciplined analyst, not a decorative chatbot. It gives you
              SQL you can inspect, visuals you can trust, and a result you can explain.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-[#0c141b] p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f1c27d]">0{index + 1}</div>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#ddd6ca]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="visuals" className="border-t border-white/10 py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b8a995]">Built for insights and visualization</p>
              <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Data visualization should clarify the story, not add another layer of noise.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#ddd6ca] sm:text-lg">
                Good dashboards use the right chart, predictable layouts, restrained color, and explicit context.
                Tableau’s best-practice guidance says those choices help people see the story faster and uncover hidden information.
                That is the same philosophy behind this landing page and the product experience.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {visualizationPrinciples.map((principle) => (
                  <div key={principle} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#8fb9aa]" />
                    <p className="text-sm leading-6 text-[#eee7db]">{principle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0d151c] p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#091017] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#b8a995]">Dashboard summary</p>
                    <p className="mt-1 text-lg font-semibold text-white">What changed this week</p>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#ddd6ca]">Auto-updated</div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#b8a995]">Top insight</p>
                    <p className="font-display mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">North region grew fastest.</p>
                    <p className="mt-3 text-sm leading-6 text-[#ddd6ca]">That is the kind of answer that should be visible before the meeting starts.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#b8a995]">Visual options</p>
                    <div className="mt-3 space-y-3 text-sm text-[#eee7db]">
                      <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>Bar chart</span><span className="text-[#8fb9aa]">Best for comparisons</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>Line chart</span><span className="text-[#8fb9aa]">Best for trends</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>Heatmap</span><span className="text-[#8fb9aa]">Best for density</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 lg:py-20">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b8a995]">Ready to ship</p>
                <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Give your team a landing page that sounds like the product it represents.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#ddd6ca] sm:text-lg">
                  Database Agent now has a stronger story: the problem is concrete, the solution is clear,
                  the proof is quantified, and the visuals actually help the page feel like a serious product.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <button
                  onClick={() => navigate('/auth?mode=register')}
                  className="inline-flex items-center justify-center rounded-full bg-[#f1c27d] px-6 py-3.5 text-sm font-semibold text-[#11151b] transition hover:bg-[#f5d39e]"
                >
                  Create account
                </button>
                <a
                  href="#problem"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
                >
                  Revisit the problem
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;