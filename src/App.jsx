import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import toast, { Toaster } from "react-hot-toast";
import fetchUsers from "./Components/FetchUsers";

function App() {
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' = صعودی، 'desc' = نزولی

  // فچ کردن داده‌ها با React Query
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"], // کلید کش برای مدیریت داده
    queryFn: fetchUsers, // تابعی که داده را فچ می‌کند
  });

  // نمایش پیام موفقیت بعد از دریافت داده
  if (users) {
    toast.success("کاربران با موفقیت دریافت شدند! 🎉");
  }

  // نمایش پیام خطا در صورت بروز مشکل
  if (error) {
    toast.error("خطایی در دریافت کاربران رخ داده است! ❌");
  }

  if (isLoading) return <div>⏳ در حال بارگذاری...</div>;
  if (error) return <div>❌ خطا: {error.message}</div>;

  // مرتب‌سازی کاربران بر اساس نام
  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div className="flex flex-col justify-center items-center m-5 gap-5 ">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4 bg-blue-200 w-1/2 p-4 flex justify-center items-center">
        لیست کاربران
      </h1>
      <button
        onClick={() => {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          toast(
            `مرتب‌سازی به حالت ${
              sortOrder === "asc" ? "نزولی" : "صعودی"
            } تغییر کرد! 🔄`
          );
        }}
        className=" p-4 bg-blue-500 border text-white font-bold hover:bg-white hover:text-blue-500  hover:border-blue-500 rounded-lg mb-4"
      >
        مرتب‌سازی بر اساس نام ({sortOrder === "asc" ? "نزولی" : "صعودی"})
      </button>
      <ul className="w-1/3  border rounded-lg p-5 grid justify-between items-center bg-blue-50">
        {sortedUsers.map((user) => (
          <li
            key={user.id}
            className="w-96 flex flex-col gap-4 font-semibold p-4 border-b-2 border-gray-300"
          >
            <span>Name: {user.name}</span> <span>Email: {user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
