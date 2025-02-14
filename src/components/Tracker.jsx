import { useState } from "react";
import { SlPrinter } from "react-icons/sl";
import { FiShare2 } from "react-icons/fi";
import { IoToggle } from "react-icons/io5";
import BarChart from "../components/UI/BarChart";

export default function Tracker() {
  const [isOpen, setIsOpen] = useState(false);
  const Duration = "03:05:00";

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <>
        <header className="flex justify-between items-center px-4 py-2 bg-gray-200/60">
          <div className="flex items-center gap-x-2">
            <h1 className="text-sm">Total :</h1>
            <span className="text-xl font-medium">{Duration}</span>
          </div>
          <div className="relative inline-block text-left">
            <div className="flex gap-12 items-center">
              <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 text-md font-medium text-gray-700"
                id="export-menu"
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                Export
              </button>
              <SlPrinter className="text-gray-600" size={20} />
              <FiShare2 className="text-gray-600" size={20} />
              <div className="flex items-center gap-2">
                <IoToggle size={24} className="text-gray-600" />
                <h2>Rounding</h2>
              </div>
            </div>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="export-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Export All
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Export Current Page
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Export Selected
                  </a>
                </div>
              </div>
            )}
          </div>
        </header>
        <section>
          <select name="category" id="">
            <option value="Projects">Projects</option>
            <option value="Billability">Billability</option>
          </select>
          <BarChart />
        </section>
      </>
    </>
  );
}
