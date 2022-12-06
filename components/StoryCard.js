import Image from "next/image";

const StoryCard = ({ name, profile, src }) => {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-36 overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      <Image
        className="absolute top-10 opacity-0 lg:opacity-100 rounded-full z-50"
        src={profile}
        height={40}
        width={40}
      />
      <Image
        className="object-cover rounded-full filter brightness-75 lg:rounded-3xl h-24"
        src={src}
        fill={true}
      />
      <p className="absolute bottom-4 w-5/6 opacity-0 lg:opacity-100 text-white text-sm font-bold truncate">
        {name}
      </p>
    </div>
  );
};

export default StoryCard;
