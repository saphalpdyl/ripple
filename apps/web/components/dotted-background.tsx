import React from 'react';

const DottedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full h-full bg-white">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='gridDots' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23333333' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23gridDots)'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DottedBackground;