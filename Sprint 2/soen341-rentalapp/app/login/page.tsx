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
      <div className="grid h-screen place-items-center bg-sky-100">
        <div className="absolute top-0 right-0 h-full rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
          <h1 className="my-4 text-4xl px-4 py-20 font-bold">Login</h1>
          <Provider formAction={Login}>
            <Spinner />
            <input
              type="text"
              className="w-full h-12 px-4 py-8 rounded-full border-2"
              name={"email"}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full h-12 px-4 py-8 rounded-full border-2"
              name={"password"}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="cursor-pointer bg-sky-900 px-6 py-3 rounded-full font-bold text-white"
            >
              Login
            </button>
          </Provider>
          <Link className="px-28 text-right text-sm" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
