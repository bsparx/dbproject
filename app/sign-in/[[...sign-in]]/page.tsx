import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
     <div className=' bg-blue-900 justify-center flex flex-nowrap items-center h-screen w-screen'>
      <SignIn />
    </div>
  );
}
