import Calendar from "../components/Calendar";
import Filter from "../components/Filter";
import Tracker from "../components/Tracker";
import VisualChart from "../components/VisualChart";


export default function Reports() {
  return (
    <section className="h-screen flex flex-col w-[98%]">
      {/* Fixed Header Section */}
      <div className="p-4 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Report Tabs */}
          <div className="flex border overflow-hidden border-gray-300">
            {["Report", "Summary"].map((tab, index) => (
              <button
                key={index}
                className="bg-white text-md px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all duration-200"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Calendar Section */}
          <div>
            <Calendar />
          </div>
        </div>
        <div className="mt-4">
          <Filter />
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Tracker />
          <VisualChart />
        </div>
      </div>
    </section>
  );
}
