import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import toast, { Toaster } from "react-hot-toast";
import fetchUsers from "./Components/FetchUsers";

function App() {
  const [sortBy, setSortby] = useState("asc"); // 'asc' = صعودی، 'desc' = نزولی

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

  const sortedUsers = [...users].sort((a, b) => {
    return sortBy === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 ">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4 bg-blue-200 w-1/2 p-4 flex justify-center items-center">
        لیست کاربران
      </h1>
      <button
        onClick={() => {
          setSortby(sortBy === "asc" ? "desc" : "asc");
        }}
        className=" p-4 bg-blue-500 border text-white font-bold hover:bg-white hover:text-blue-500  hover:border-blue-500 rounded-lg mb-4 mt-10"
      >
        مرتب‌سازی بر اساس نام ({sortBy === "asc" ? "نزولی" : "صعودی"})
      </button>
      <ul className="w-1/3  border rounded-lg p-5 grid justify-between items-center bg-blue-50">
        {sortedUsers.map((user) => (
          <li
            key={user.id}
            className=" flex  gap-4 font-semibold p-4 border-b-2 border-gray-300"
          >
            <img
              src="../public/images.jpg"
              className="bg-slate-300 border w-20 h-20 rounded-full"
              alt="image"
            />
            <div className="flex flex-col justify-center gap-2">
              <span>Name: {user.name}</span> <span>Email: {user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
