import Link from "next/link";
import NavLinks from "./navlinks";
import { UserButton } from "@clerk/nextjs";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-full text-white ">
          <h1 className="text-center text-3xl">Quiz Craft </h1>
        </div>
        <div className="inline-block md:hidden">
          <UserButton />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 flex-wrap">
        <NavLinks />

        <div className=" h-auto w-full grow rounded-md flex mt-auto">
          <div className="flex items-end p-4 md:block hidden">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
