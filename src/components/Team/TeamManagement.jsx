import React, { useState } from "react";

const membersData = [
  { name: "Anand Kumar", email: "anand@guvi.in", role: "", group: "MERN" },
  { name: "Arun Kumar", email: "arunkum@guvi.in", role: "", group: "" },
  { name: "ArunPragash A P", email: "arunprgash@guvi.in", role: "", group: "" },
  { name: "Ashish Prabhu K", email: "ashishprabhu@guvi.in", role: "", group: "UX/UI" },
];

const TeamManagement=() => {
  const [activeTab, setActiveTab] = useState("members");
  const [search, setSearch] = useState("");

  const filteredMembers = membersData.filter(
    (member) => member.name.toLowerCase().includes(search.toLowerCase()) || member.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-lg font-medium ${activeTab === "members" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("members")}
        >
          MEMBERS
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium ${activeTab === "groups" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("groups")}
        >
          GROUPS
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded-md">
          <option>Show all</option>
          <option>MERN</option>
          <option>UX/UI</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 flex-1 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">NAME</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">ROLE</th>
              <th className="p-3 text-left">GROUP</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.role || "-"}</td>
                <td className="p-3">
                  {member.group ? <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm">{member.group}</span> : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamManagement;
