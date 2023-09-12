import React from "react";

const SkeletonCard = () => (
  <div className="bg-gray-200 p-4 rounded-lg shadow-lg animate-pulse m-2">
    <div className="bg-gray-300 h-52 min-h-52 w-200 w-full mb-2 rounded-md"></div>
  </div>
);

const Skeleton = () => {
    
  const data = Array.from({ length: 20 }, (_, index) => index);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
