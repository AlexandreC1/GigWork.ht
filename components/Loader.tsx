
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary"></div>
      {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
