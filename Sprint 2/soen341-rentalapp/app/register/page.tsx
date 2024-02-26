import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { registerUser } from "@/lib/actions/usersActions";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="rounded-lg border-t-4 border-green-400 bg-white p-5 shadow-lg">
        <h1 className="my-4 text-xl font-bold">Register</h1>
        <Provider formAction={registerUser}>
          <Spinner />
          <input
            type="text"
            className="rounded-md border-2"
            name={"firstName"}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            className="rounded-md border-2"
            name={"lastName"}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            className="rounded-md border-2"
            name={"email"}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="rounded-md border-2"
            name={"password"}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white"
          >
            Register
          </button>
        </Provider>
        <Link className="my-4 text-right text-sm" href={"/login"}>
          Already have an account? <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
