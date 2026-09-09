import {Link} from 'react-router-dom'

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-50 to-slate-100 p-6 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-[0_12px_35px_rgba(15,23,42,0.12)] box-border">
        <div className="text-center text-2xl font-bold text-indigo-600">ChatApp</div>
        <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          Sign in to continue chatting with your friends.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <div className="mt-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <Link to='/forgot-password' type="button" className="bg-transparent border-none p-0 text-sm font-medium text-indigo-600 cursor-pointer">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" type="button" className="bg-transparent border-none p-0 text-sm font-medium text-indigo-600 cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
