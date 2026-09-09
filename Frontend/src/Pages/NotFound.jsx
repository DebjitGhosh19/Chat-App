const NotFound = () => {
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
			<div className="w-full max-w-lg text-center">
				<p className="mb-4 text-8xl font-black tracking-tight text-indigo-500">404</p>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Page not found
				</h1>
				<p className="mt-4 text-base leading-7 text-slate-400">
					Sorry, we couldn&apos;t find the page you&apos;re looking for.
				</p>
				<a
					href="/"
					className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
				>
					Back to home
				</a>
			</div>
		</main>
	);
};

export default NotFound;
