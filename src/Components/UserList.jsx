function UserList({ sortedUsers }) {
  return (
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
  );
}

export default UserList;
