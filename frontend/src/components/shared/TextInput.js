import React from "react";

export default function TextInput({
  label,
  placeholder,
  name,
  value,
  setUser,
  className
}) {
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
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="font-semibold text-white">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        className={`p-3 border-solid border border-gray-500 rounded placeholder-gray-500 ${className}`}
        id={label}
      />
    </div>
  );
}
