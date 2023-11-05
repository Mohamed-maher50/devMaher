import React from "react";

const Theme = ({ colors, name, onClick }) => {
  return (
    <div
      className=" p-3 cursor-pointer shadow rounded-lg "
      onClick={onClick}
      style={{
        background: colors[0],
      }}
    >
      <div className="flex gap-2 w-fit mx-auto">
        {colors.map((value, index) => {
          return (
            <div
              className={`h-4 w-4 rounded-full shadow-md`}
              style={{
                background: value,
              }}
              key={index}
            ></div>
          );
        })}
      </div>

      <h1 className="flex flex-1">{name}</h1>
    </div>
  );
};

export default Theme;
