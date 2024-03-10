import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import Login from "@/lib/actions/login";
import { getUserSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginForm() {
  const user = await getUserSession();
  if (user) redirect("/");
  return (
    <div>
      <div className="grid h-screen place-items-center">
        <div className="rounded-lg border-t-4 border-green-400 bg-white p-5 shadow-lg">
          <h1 className="my-4 text-xl font-bold">Login</h1>
          <Provider formAction={Login}>
            <Spinner />
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
              Login
            </button>
          </Provider>
          <Link className="mt-3 text-right text-sm" href={"/register"}>
            {`Don't have an account?`} <span className="underline">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
