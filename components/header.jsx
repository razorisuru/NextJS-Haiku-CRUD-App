import { logout } from "@/actions/userController";
import { getUserFromCookie } from "@/lib/getUser";
import Link from "next/link";

export default async function Header() {
  const user = await getUserFromCookie();
  return (
    <div className="container mx-auto">
      <div className="navbar ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user && (
                <form action={logout} className="btn btn-secondary"> 
                  <button >Logout</button>
                </form>
              )}
              {!user && (
                <Link href="/login" className="btn btn-secondary">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
