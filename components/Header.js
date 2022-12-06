import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { getSession, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top z-10 flex items-center p-2 lg:p-3 bg-white shadow-md">
      <div className="flex items-center">
        <Image src="http://links.papareact.com/5me" width={40} height={40} />
        <div className="flex ml-2 items-center bg-gray-100 rounded-full p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            type="text"
            className="hidden md:inline-flex ml-2 outline-none bg-transparent placeholder-gray-500 flex-shrink"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* Left */}

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Center */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width="40"
          height="40"
        />
        <p className="font-semibold pr-3 whitespace-nowrap">
          {session.user.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
      {/* Right */}
    </div>
  );
};

export default Header;
