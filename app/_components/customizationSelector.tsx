"use client";

import React, { useState } from "react";
import useProductStore from "./_stores/useProductStore";

function CustomizationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sem personalização");
  const { customDescription, setCustomDescription } = useProductStore();
  const [inputText, setInputText] = useState(customDescription);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setCustomDescription(newText);
  };

  const options: string[] = ["Sem personalização", "Com personalização"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.12l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {selectedOption === "Com personalização" && (
          <>
            <input
              type="text"
              placeholder="Descreva como quer"
              className="mt-2 w-full rounded-sm px-4 py-2 focus:outline-none"
              onChange={handleInputChange}
            />
          </>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                value={inputText}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomizationSelector;
