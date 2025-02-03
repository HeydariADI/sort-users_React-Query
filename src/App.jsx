import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import toast, { Toaster } from "react-hot-toast";
import fetchUsers from "./Components/FetchUsers";
import UserList from "./Components/UserList";
import SearchUsers from "./Components/SearchUsers";

function App() {
  const [sortBy, setSortby] = useState("asc"); // 'asc' = صعودی، 'desc' = نزولی
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (error) {
    toast.error("خطایی در دریافت کاربران رخ داده است! ❌");
  }

  if (isLoading) return <div>⏳ در حال بارگذاری...</div>;
  if (error) return <div>❌ خطا: {error.message}</div>;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortBy === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div className=" flex flex-col justify-center items-center mt-10 gap-5 ">
      <Toaster position="top-center m-5" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4 bg-blue-200 w-1/2 p-4 flex justify-center items-center">
        لیست کاربران
      </h1>
      <SearchUsers searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <button
        onClick={() => {
          setSortby(sortBy === "asc" ? "desc" : "asc");
        }}
        className="w-96 p-4 bg-blue-500 border text-white font-bold hover:bg-white hover:text-blue-500  hover:border-blue-500 rounded-lg mb-4 mt-10"
      >
        مرتب‌سازی بر اساس نام ({sortBy === "asc" ? "نزولی" : "صعودی"})
      </button>

      <UserList sortedUsers={sortedUsers} />
    </div>
  );
}

export default App;
