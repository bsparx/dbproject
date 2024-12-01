

const Loading = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        Loading <span className="text-blue-500">Dashboard...</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      
        <div className="animate-pulse space-y-3 bg-gray-50 rounded-lg p-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <div className="animate-pulse space-y-3 bg-gray-50 rounded-lg p-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
       
        <div className="animate-pulse space-y-3 bg-gray-50 rounded-lg p-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
