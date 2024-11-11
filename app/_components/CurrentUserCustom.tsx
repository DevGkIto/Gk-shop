import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";

const CurrentUserCustom = () => {
  const { user } = useUser();
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
