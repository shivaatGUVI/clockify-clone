import Accordion from "./Accordion";
import DoughnutChart from "./UI/DoughnutChart";

export default function VisualChart() {
  return (
    <section className="bg-white border border-gray-300 my-12">
      <div>
        {/* Header with filters */}
        <div className="bg-[#e4e9ed]/80 py-2 px-4">
          <div className="flex items-center gap-x-7">
            <h1 className="text-gray-700 font-semibold">Group by</h1>
            <select
              name="groupBy"
              id="groupBy"
              aria-label="Group by selection"
              className="mt-1 block w-40 px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="project">Project</option>
              <option value="user">User</option>
              <option value="group">Group</option>
              <option value="date">Date</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <select
              name="filterBy"
              id="filterBy"
              aria-label="Filter selection"
              className="mt-1 block w-40 px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="project">Description</option>
              <option value="user">User</option>
              <option value="group">Group</option>
              <option value="date">Date</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-1/2">
            <Accordion />
          </div>
          <div className="w-full md:w-1/2 flex justify-center bg-gray-200/40 p-4 rounded">
            <div className="w-80 h-80">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
