import axios from "axios";

// فانکشن دریافت کاربران از API
const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data; // API لیست کاربران را مستقیماً داخل `data` برمی‌گرداند
};

export default fetchUsers;
