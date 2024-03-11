import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { registerUser } from "@/lib/actions/usersActions";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="grid h-screen place-items-center bg-sky-100">
      <div className="absolute top-0 right-0 h-full rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
        <h1 className="my-4 text-4xl px-4 py-20 font-bold">Register</h1>
        <Provider formAction={registerUser}>
          <Spinner />
          <input
            type="text"
            className="w-full h-12 px-4 py-8 rounded-full border-2"
            name={"firstName"}
            placeholder=" First Name"
            required
          />
          <input
            type="text"
            className="w-full h-12 px-4 py-8 rounded-full border-2"
            name={"lastName"}
            placeholder=" Last Name"
            required
          />
          <input
            type="text"
            className="w-full h-12 px-4 py-8 rounded-full border-2"
            name={"email"}
            placeholder=" Email"
            required
          />
          <input
            type="password"
            className="w-full h-12 px-4 py-8 rounded-full border-2"
            name={"password"}
            placeholder=" Password"
            required
          />
          <button
            type="submit"
            className="cursor-pointer bg-sky-900 px-6 py-3 rounded-full font-bold text-white"
          >
            Register
          </button>
        </Provider>
        <Link className="px-28 text-right text-sm" href={"/login"}>
          Already have an account? <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
