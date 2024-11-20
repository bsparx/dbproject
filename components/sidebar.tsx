import Link from "next/link";
import NavLinks from "./navlinks";
import { UserButton } from "@clerk/nextjs";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-4 py-6">
      <Link
        className="mb-6 flex h-20 items-end justify-start rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-4 md:h-32 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        href="/"
      >
        <div className="w-full text-white">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            Quiz Craft
          </h1>
          <div className="w-16 h-1 bg-blue-200 mx-auto mt-2 rounded-full" />
        </div>
        <div className="inline-block md:hidden">
          <UserButton />
        </div>
      </Link>
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 flex-wrap">
        <div className="w-full space-y-1">
          <NavLinks />
        </div>

        <div className="h-auto w-full grow rounded-md flex mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-end p-4 md:block hidden w-full">
            <div className="flex items-center gap-4 px-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Your Account</span>
                <span className="text-xs text-gray-500">Manage profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}