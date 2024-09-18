// import { useLoaderData } from "react-router-dom";
import { Header } from "./Navbar";
import { CiUnlock } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useUser } from "../provider/UserProvider";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { user, setUser } = useUser(); 
  const loggedInUserId = user?.id; 
  console.log(loggedInUserId);


  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    // Update selectedUsers based on selectAll state
    if (selectAll) {
      setSelectedUsers(users.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectAll, users]);
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://ums-backend-beta.vercel.app/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleSelectAllChange = () => {
    // Toggle selectAll state
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };
  const handleAction = async (action) => {
    try {
      const response = await fetch(`https://ums-backend-beta.vercel.app/users/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      const result = await response.json();
      console.log(result);
      // Refresh or update the user list after action
      
      fetchUsers();
      setSelectedUsers([]);
      setSelectAll(false);
      if (action === "block" || action === "delete") {
        if (selectedUsers.includes(loggedInUserId)) {
          handleLogout();
        }
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogout = () => {
    // Clear user state
    setUser(null);
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/"; // Redirect to login page
  };
  return (
    <div>
      <Header />
      <div className="overflow-x-auto max-w-7xl mx-auto mt-20">
        <div className="flex items-center space-x-4 mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleAction("block")}
          >
            Block
          </button>
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => handleAction("unblock")}
          >
            <CiUnlock />
          </button>
          <button
            className=" hover:text-red-900 text-red-500"
            onClick={() => handleAction("delete")}
          >
            <RiDeleteBin5Line />
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100">
              <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>

              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">
                Name
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">
                Email
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">
                Last Login
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">
                Registration Time
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border-b border-gray-300">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>

                <td className="px-4 py-2 border-b border-gray-300">
                  {user.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.lastLogin && new Date(user.lastLogin).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {new Date(user.registrationTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
