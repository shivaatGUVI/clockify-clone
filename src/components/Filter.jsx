import { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Filter() {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [selectedFilter, setSelectedFilter] = useState(null); // State for selected filter
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const filterOptions = [
    "Team",
    "Client",
    "Project",
    "Task",
    "Tag",
    "Description",
  ];

  const handleDropdownToggle = (filter) => {
    setSelectedFilter(filter); // Set the selected filter
    // Toggle the dropdown visibility
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  const getDropdownContent = (filter) => {
    switch (filter) {
      case "Filter":
        return <div className="p-2">Content for Filter</div>;
      case "Team":
        return <div className="p-2">Content for Team</div>;
      case "Client":
        return <div className="p-2">Content for Client</div>;
      case "Project":
        return <div className="p-2">Content for Project</div>;
      case "Task":
        return <div className="p-2">Content for Task</div>;
      case "Tag":
        return <div className="p-2">Content for Tag</div>;
      case "Description":
        return <div className="p-2">Content for Description</div>;
      default:
        return null;
    }
  };

  // Close dropdown if click is outside the dropdown area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null); // Close the dropdown
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="flex flex-wrap items-center border border-gray-300 p-2 justify-between gap-4">
        <div className="flex gap-3 items-center flex-wrap w-full sm:w-auto">
          {filterOptions.map((option) => (
            <div key={option} className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownToggle(option)}
                className="font-medium text-md text-gray-500/90 border-r border-gray-300 px-4 cursor-pointer inline-flex items-center"
              >
                {option}
                <IoMdArrowDropdown />
              </button>

              {/* Dynamic Dropdown below each filter */}
              {openDropdown === option && (
                <div className="absolute top-8 left-0 w-full sm:w-80 bg-white p-2 mt-1 shadow-lg border border-gray-300">
                  <input
                    type="text"
                    placeholder={`Search ${selectedFilter}`}
                    className="border border-gray-300 p-2 w-full"
                  />
                  {getDropdownContent(option)}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="bg-sky-400 cursor-pointer px-4 py-2 font-medium text-white hover:bg-sky-600 uppercase w-full sm:w-auto">
          Apply Filter
        </button>
      </div>
    </section>
  );
}
