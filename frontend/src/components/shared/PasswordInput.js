import React from "react";

export default function PasswordInput({label,placeholder,name,value,setUser}) {
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="text-white flex flex-col gap-2 w-full">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        className="p-3 border-solid border border-gray-500 rounded placeholder-gray-500 bg-transparent"
        id={label}
      />
    </div>
  );
}
