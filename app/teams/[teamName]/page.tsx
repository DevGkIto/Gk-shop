interface TeamPageProps {
  params: {
    teamName: string;
  };
}

const TeamPage = async ({ params }: TeamPageProps) => {
  const teamName = await params;
  return (
    <div className="bg-gray-100 h-[200px] mt-7 text-black">
      {params.teamName}
    </div>
  );
};

export default TeamPage;
