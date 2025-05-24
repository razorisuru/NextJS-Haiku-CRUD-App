import { getUserFromCookie } from "@/lib/getUser";
import HaikuForm from "@/components/HaikuForm";
import {redirect} from "next/navigation";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }

  
  return (
    <>
      <h2 className="text-center text-2xl text-gray-500 mb-5">Create Haiku</h2>
      <HaikuForm action="create"/>
    </>
  );
}
