import { getStreams } from "@/lib/feed_service";
import ResultCard from "./ResultCard";
import { getUserBYId } from "@/lib/user_service";

const Results = async () => {
    const data = await getStreams();
    let userImage=[];
    for (let i = 0; i < data.length; i++)
    {
        
        let da = await getUserBYId(data[i].userid)
        userImage.push(da[0]);
    }
    console.log(userImage)
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className="text-[#ccc] text-sm">No streams Found...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.length > 0 &&
          data.map((el,i) => <ResultCard key={el.id} data={el} user={userImage[i]}></ResultCard>)}
      </div>
    </div>
  );
};

export default Results;

export const ResultsSkeleton = () => {
  return <div></div>;
};
