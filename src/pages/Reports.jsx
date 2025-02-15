import Calendar from "../components/Calendar";
import Filter from "../components/Filter";
import Tracker from "../components/Tracker";
import VisualChart from "../components/VisualChart";
import ReportPage from "../components/ReportPage";

export default function Reports() {
  return (
    <section className="p-6 md:p-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Report Tabs */}
        <div className="flex border overflow-hidden border-gray-300">
          {["Report", "Summary", "Weekly"].map((tab, index) => (
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
      <div>
        <Filter />
      </div>
      <Tracker />
      <VisualChart />
      <ReportPage />
    </section>
  );
}
