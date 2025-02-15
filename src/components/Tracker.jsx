// import { useState } from "react";
// import { SlPrinter } from "react-icons/sl";
// import { FiShare2 } from "react-icons/fi";
// import { IoToggle } from "react-icons/io5";
// import BarChart from "../components/UI/BarChart";

// export default function Tracker() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("Projects");
//   const Duration = "03:05:00";

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <>
//       <header className="flex justify-between items-center px-4 py-2 border-t border-x border-gray-300 bg-gray-200/60">
//         <div className="flex items-center gap-x-2">
//           <h1 className="text-sm">Total:</h1>
//           <span className="text-xl font-medium">{Duration}</span>
//         </div>
//         <div className="relative inline-block text-left">
//           <div className="flex gap-10 items-center">
//             <button
//               type="button"
//               className="inline-flex justify-center items-center px-4 py-2 text-md font-medium text-gray-700"
//               id="export-menu"
//               aria-expanded={isOpen ? "true" : "false"}
//               aria-haspopup="true"
//               onClick={toggleDropdown}
//             >
//               Export
//             </button>
//             <SlPrinter className="text-gray-600" size={20} />
//             <FiShare2 className="text-gray-600" size={20} />
//             <div className="flex items-center gap-2">
//               <IoToggle size={24} className="text-gray-600" />
//               <h2>Rounding</h2>
//             </div>
//           </div>

//           {isOpen && (
//             <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
//               <div
//                 className="py-1"
//                 role="menu"
//                 aria-orientation="vertical"
//                 aria-labelledby="export-menu"
//               >
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                   role="menuitem"
//                 >
//                   Export All
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                   role="menuitem"
//                 >
//                   Export Current Page
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                   role="menuitem"
//                 >
//                   Export Selected
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       <section className="p-4 bg-white border-l border-r border-b border-gray-300">
//         <div className="mb-4">
//           <select
//             id="category"
//             name="category"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             className="mt-1 block w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="Projects">Projects</option>
//             <option value="Billability">Billability</option>
//           </select>
//         </div>
//         <BarChart />
//       </section>
//     </>
//   );
// }

import { useState } from "react";
import { SlPrinter } from "react-icons/sl";
import { FiShare2 } from "react-icons/fi";
import { IoToggle } from "react-icons/io5";
import BarChart from "../components/UI/BarChart";
import ReportPage from "../components/ReportPage";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl relative">
        {/* Report Page */}
        <ReportPage />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded right-8 absolute top-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Tracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Projects");
  const Duration = "03:05:00";

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 border-t border-x border-gray-300 bg-gray-200/60">
        <div className="flex items-center gap-x-2">
          <h1 className="text-sm">Total:</h1>
          <span className="text-xl font-medium">{Duration}</span>
        </div>
        <div className="relative inline-block text-left">
          <div className="flex gap-10 items-center">
            <SlPrinter
              className="text-gray-600 cursor-pointer"
              size={20}
              onClick={() => setIsModalOpen(true)}
            />
            <FiShare2 className="text-gray-600" size={20} />
            <div className="flex items-center gap-2">
              <IoToggle size={24} className="text-gray-600" />
              <h2>Rounding</h2>
            </div>
          </div>
        </div>
      </header>

      <section className="p-4 bg-white border-l border-r border-b border-gray-300">
        <div className="mb-4">
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Projects">Projects</option>
            <option value="Billability">Billability</option>
          </select>
        </div>
        <BarChart />
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
