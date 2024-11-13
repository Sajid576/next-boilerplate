import React from 'react';

const CustomChip = ({ label }:{label:string}) => {
  return (
    <button
      className={`mb-0 flex !h-[28px] cursor-pointer items-center justify-center rounded-[4px] bg-[#EDEDED] px-2  text-center text-[14px] text-[#000]`}
    >
      {label}
    </button>
  );
};

export default CustomChip;
