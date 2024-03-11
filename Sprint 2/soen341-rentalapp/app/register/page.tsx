import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { registerUser } from "@/lib/actions/usersActions";
import Link from "next/link";
import { Suspense } from "react";

export default function RegisterForm() {
  return (
    <div className="grid h-screen place-items-center bg-sky-100">
      <div className="absolute right-0 top-0 h-full rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
        <h1 className="my-4 px-4 py-20 text-4xl font-bold">Register</h1>
        <Suspense>
          <Provider formAction={registerUser}>
            <Spinner />
            <input
              type="text"
              className="h-12 w-full rounded-full border-2 px-4 py-8"
              name={"firstName"}
              placeholder=" First Name"
              required
            />
            <input
              type="text"
              className="h-12 w-full rounded-full border-2 px-4 py-8"
              name={"lastName"}
              placeholder=" Last Name"
              required
            />
            <input
              type="text"
              className="h-12 w-full rounded-full border-2 px-4 py-8"
              name={"email"}
              placeholder=" Email"
              required
            />
            <input
              type="password"
              className="h-12 w-full rounded-full border-2 px-4 py-8"
              name={"password"}
              placeholder=" Password"
              required
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-sky-900 px-6 py-3 font-bold text-white"
            >
              Register
            </button>
          </Provider>
        </Suspense>

        <Link className="px-28 text-right text-sm" href={"/login"}>
          Already have an account? <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
