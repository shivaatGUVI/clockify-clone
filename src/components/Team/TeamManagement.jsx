import { useEffect, useState } from "react";
import { Search, ChevronDown, Plus, X } from 'lucide-react';
import axios from "axios";

export default function TeamManagement() {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('MEMBERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState('');


  const getAllMembers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  const getAllGroups = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
      setGroups(data.map(group => group.name));
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  useEffect(() => {
    getAllMembers();
    getAllGroups();
  }, []);

  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    if (!selectedMember || !selectedGroup) {
      setError("Please select a group before adding a member.");
      return;
    }
  
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/group/addmembers`, {
        userId: selectedMember.id,
        groupId: selectedGroup
      });
  
      setShowModal(false);
      setSelectedGroup("");
      setSelectedMember(null);
      getAllMembers();
    } catch (error) {
      console.error("Error adding member to group", error);
      setError("Failed to add member to group.");
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl text-gray-700 mb-6">Team</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            className={`pb-4 px-1 ${activeTab === 'MEMBERS' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('MEMBERS')}
          >
            MEMBERS
          </button>
          <button
            className={`pb-4 px-1 ${activeTab === 'GROUPS' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('GROUPS')}
          >
            GROUPS
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex gap-4">
        <div className="dropdown relative">
          <button className="px-4 py-2 border rounded-md text-gray-600 bg-white flex items-center gap-2">
            Show all
            <ChevronDown size={16} />
          </button>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500">
          Members
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">NAME</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">EMAIL</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">ROLE</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">GROUP</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                <td className="px-6 py-4 text-gray-800">{member.name}</td>
                <td className="px-6 py-4 text-gray-800">{member.email}</td>
                <td className="px-6 py-4 text-gray-800">{member.role || ''}</td>
                <td className="px-6 py-4">
                  {member.group && (
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">{member.group}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <Plus size={20} onClick={() => { setShowModal(true); setSelectedMember(member); }} className="text-green-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adding Member to the Group */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add {selectedMember?.name} to Group</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                  <select className="w-full p-2 border rounded-md" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add to Group</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
