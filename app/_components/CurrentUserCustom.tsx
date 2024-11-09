import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarImage } from "./ui/avatar";

const CurrentUserCustom = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="w-10 h-10">
        <AvatarImage src={user?.imageUrl} className="w-full h-full" />
      </Avatar>
      <h2>{user?.fullName}</h2>
    </div>
  );
};

export default CurrentUserCustom;
