import { logout } from "@/actions/userController";
import { getUserFromCookie } from "@/lib/getUser";
import Link from "next/link";

export default async function Header() {
  const user = await getUserFromCookie();
  return (
    <div className="container mx-auto">
      <div className="navbar ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost btn-xl">
            Haiku App
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user && (
              <>
                <li className="mr-3">
                  <Link href="/create-haiku" className="btn btn-primary btn-xl">
                    New Haiku
                  </Link>
                </li>
                <li>
                  <form action={logout} className="btn btn-error btn-xl">
                    <button>Logout</button>
                  </form>
                </li>
              </>
            )}
            {!user && (
              <Link href="/login" className="btn btn-success btn-xl">
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
