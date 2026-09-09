import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
			<section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
						🔐
					</div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						Set new password
					</h1>
					<p className="mt-3 text-sm leading-6 text-slate-500">
						Create a new password and confirm it below.
					</p>
				</div>

				{submitted ? (
					<div
						className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-700"
						role="status"
					>
						Your password has been updated successfully.
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label
								htmlFor="password"
								className="mb-2 block text-sm font-medium text-slate-700"
							>
								New password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								placeholder="Enter new password"
								required
								className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="mb-2 block text-sm font-medium text-slate-700"
							>
								Confirm password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
								placeholder="Confirm new password"
								required
								className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Update password
						</button>
					</form>
				)}

				<p className="mt-8 text-center text-sm text-slate-500">
					Remember your password?{" "}
					<Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
						Back to login
					</Link>
				</p>
			</section>
		</main>
	);
}
