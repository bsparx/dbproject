import SideNav from "@/components/sidebar";

export default async function page({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-72 bg-white shadow-lg">
          <SideNav />
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-8 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}