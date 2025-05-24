import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { cookies } from "next/headers";
import { deleteHaiku } from "@/actions/haikuController";

async function getHaikus(id) {
  const collection = await getCollection("haikus");
  const results = await collection
    .find({ author: ObjectId.createFromHexString(id) })
    .sort({ createdAt: -1 })
    .toArray();

  return results;
}

export default async function Dashboard(props) {
  const cookieStore = cookies();
  const success = cookieStore.get("success")?.value;
  const haikus = await getHaikus(props.user.userId);
  return (
    <div className="container mx-auto p-10">

      <h2 className="text-center text-2xl text-gray-500 mb-5">Your Haikus</h2>


      {haikus.map((haiku, index) => {
        return (
          <div
            key={index}
            className="bg-blue-400 p-5 rounded-lg shadow-md mb-5"
          >
            <h3 className="text-xl font-semibold">{haiku.line1}</h3>
            <p className="text-gray-700 mt-2">{haiku.line2}</p>
            <p className="text-gray-700 mt-2">{haiku.line3}</p>
            <p className="text-gray-500 mt-2 text-sm">
              Created at: {new Date(haiku.createdAt).toLocaleDateString()}
            </p>
            <Link href={`/edit-haiku/${haiku._id.toString()}`}>EDIT</Link>
            <form action={deleteHaiku}>
              <input type="hidden" name="id" value={haiku._id.toString()} />
              <button
                type="submit"
                className="text-red-600 cursor-auto"
              >
                DELETE
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
