import { useState } from "react";
import {Link} from 'react-router-dom'
import { useAuth } from "../../context/AuthContex";
export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    bio: "",
  });
 const { login } = useAuth();
  const handleChange = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    // Connect this form to the signup API here.
        login("signup",form)
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-50 p-6 font-sans text-blue-950">
      <section
        className="w-full max-w-[440px] rounded-[20px] bg-white p-10 shadow-[0_20px_50px_rgba(30,41,59,0.12)]"
        aria-labelledby="signup-title"
      >
        <div
          className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] bg-indigo-600 text-2xl font-bold text-white"
          aria-hidden="true"
        >
          💬
        </div>
        <h1 id="signup-title" className="mb-2 text-[30px] font-bold">
          {step === 1 ? "Create your account" : "Complete your profile"}
        </h1>
        <p className="mb-7 text-slate-500">
          {step === 1
            ? "Join your friends and start chatting today."
            : "Add a photo and tell us a little about yourself."}
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <label
                className="mb-[7px] block text-sm font-semibold"
                htmlFor="name"
              >
                Full name
              </label>
              <input
                className="mb-[18px] box-border w-full rounded-[10px] border border-slate-300 px-[14px] py-[13px] text-[15px] outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                id="name"
                name="name"
                type="text"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label
                className="mb-[7px] block text-sm font-semibold"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="mb-[18px] box-border w-full rounded-[10px] border border-slate-300 px-[14px] py-[13px] text-[15px] outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label
                className="mb-[7px] block text-sm font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mb-[18px] box-border w-full rounded-[10px] border border-slate-300 px-[14px] py-[13px] text-[15px] outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                minLength="8"
                value={form.password}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <div className="flex flex-col-reverse">
                <div >
                  <label
                    className="mb-[7px] block text-sm font-semibold"
                    htmlFor="image"
                  >
                    Profile image
                  </label>
                  <input
                    className="mb-[18px] box-border w-full rounded-[10px] border border-slate-300 px-[14px] py-[13px] text-[15px] outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={({ target }) =>
                      setForm((current) => ({
                        ...current,
                        image: target.files[0],
                      }))
                    }
                  />
                </div>{" "}
                {form.image && (
                  <div className="mb-[18px] flex items-center justify-center">
                    <img
                      className="h-32 w-32 rounded-full object-cover"
                      src={URL.createObjectURL(form.image)}
                      alt="Selected profile preview"
                    />
                  </div>
                )}
              </div>
              <label
                className="mb-[7px] block text-sm font-semibold"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                className="mb-[18px] box-border min-h-24 w-full resize-y rounded-[10px] border border-slate-300 px-[14px] py-[13px] text-[15px] outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={form.bio}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="flex gap-3">
            {step === 2 && (
              <button
                className="mt-1 w-full cursor-pointer rounded-[10px] border border-indigo-600 bg-white p-[14px] text-base font-bold text-indigo-600 transition hover:bg-indigo-50"
                type="button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            )}
            <button
              className="mt-1 w-full cursor-pointer rounded-[10px] border-0 bg-indigo-600 p-[14px] text-base font-bold text-white transition hover:bg-indigo-700"
              type="submit"
            >
              {step === 1 ? "Next" : "Create account"}
            </button>
          </div>
        </form>

        <p className="mt-[22px] text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            className="font-bold text-indigo-600 no-underline hover:underline"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
