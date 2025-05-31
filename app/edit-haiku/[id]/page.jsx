import HaikuForm from "@/components/HaikuForm";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

function sanitizeDoc(doc) {
  return {
    ...doc,
    _id: doc._id.toString(),
  };
}

async function getDoc(id) {
  const haikusCollection = await getCollection("haikus");
  const result = await haikusCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

export default async function Page(props) {
  const doc = await getDoc(props.params.id);
  const plainDoc = sanitizeDoc(doc);

//   console.log("doc", plainDoc);
  return (
    <>
      <h2 className="text-center text-4xl text-gray-400 mb-5">
        Edit Haiku 
      </h2>
      <HaikuForm haiku={plainDoc} action="edit" />
    </>
  );
}
