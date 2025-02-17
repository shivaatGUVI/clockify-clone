import { useState } from "react";

const AccordionItem = ({ title, duration, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      <button
        className="w-full flex justify-between items-center bg-white p-4 text-left font-semibold transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-gray-500 text-sm">{duration}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 p-4 bg-gray-50 text-gray-600" : "max-h-0 p-0"
        }`}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="p-5 w-full max-w-5xl">
      <div className="w-full space-y-3">
        <AccordionItem title="Accordion Title 1" duration="2 mins">
          This is the content of the first accordion item.
        </AccordionItem>
        <AccordionItem title="Accordion Title 2" duration="5 mins">
          This is the content of the second accordion item.
        </AccordionItem>
      </div>
    </div>
  );
};

export default Accordion;
