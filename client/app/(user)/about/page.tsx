import React from "react";
import { Map, Activity, Filter, Info } from "lucide-react";
const About = () => {
	return (
		<main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
			<div className="w-full max-w-5xl rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl p-8 sm:p-12">
				{/* Header */}
				<header className="mb-10">
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
						QuakeAlert
					</h1>
					<p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
						Real-time seismic intelligence, refined into a clean and interactive
						experience. Monitor, explore, and understand earthquake activity
						without noise.
					</p>
				</header>

				{/* Features */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wider">
						Capabilities
					</h2>

					<div className="mt-6 grid gap-6 sm:grid-cols-2">
						{[
							{
								icon: Map,
								title: "Interactive Mapping",
								desc: "Smooth clustering and zoom transitions for intuitive spatial exploration.",
							},
							{
								icon: Activity,
								title: "Live Data Feed",
								desc: "Continuously updated seismic data with minimal latency.",
							},
							{
								icon: Filter,
								title: "Smart Filtering",
								desc: "Refine results by magnitude, time range, and geographic bounds.",
							},
							{
								icon: Info,
								title: "Event Insights",
								desc: "Detailed breakdown including depth, coordinates, and timestamps.",
							},
						].map((item, index) => {
							const Icon = item.icon;

							return (
								<div
									key={index}
									className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
								>
									{/* Icon */}
									<div className="mb-4 flex items-center gap-3">
										<div className="rounded-lg bg-slate-100 p-2  transition-colors">
											<Icon className="h-5 w-5 text-slate-700  transition-colors" />
										</div>
										<h3 className="text-base font-semibold text-slate-800">
											{item.title}
										</h3>
									</div>

									{/* Description */}
									<p className="text-sm text-slate-600 leading-relaxed transition-colors">
										{item.desc}
									</p>

									{/* subtle gradient hover effect */}
									<div className="absolute inset-0 rounded-xl opacity-0  pointer-events-none transition-opacity" />
								</div>
							);
						})}
					</div>
				</section>

				{/* Minimal features */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wider">
						Minimal Features
					</h2>
					<div className="mt-6 grid gap-4 text-slate-700 leading-relaxed">
						<p>
							Built with restraint. Every element exists for a reason. No
							clutter, no distractions.
						</p>
					</div>
				</section>

				{/* Architecture */}
				<section>
					<h2 className="text-xl font-semibold text-slate-800 uppercase tracking-wider">
						System Architecture
					</h2>
					<p className="mt-4 text-slate-700 leading-relaxed max-w-3xl">
						Powered by scalable backend services, optimized geo-queries, and
						modular data pipelines. Designed to handle continuous seismic
						streams while maintaining performance and accuracy.
					</p>
				</section>
			</div>
		</main>
	);
};

export default About;
