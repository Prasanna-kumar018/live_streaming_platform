import UrlCard from "./_components/urlcards";
import { getStreamByUserId } from "@/lib/stream_service";
import { getSelf } from "@/lib/auth_service";
import KeyCard from "./_components/keycard";
import ConnectModel from "./_components/connect_model";

const KeysPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  console.log(stream);
  if (stream.length == 0) {
    throw new Error("Stream Not Found");
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModel />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream[0].serverurl} />
        <KeyCard value={stream[0].streamkey} />
      </div>
    </div>
  );
};

export default KeysPage;
