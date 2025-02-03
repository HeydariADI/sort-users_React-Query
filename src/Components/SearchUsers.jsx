function SearchUsers({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        id="name"
        className="w-96 p-4 rounded-xl font-semibold border border-blue-500 hover:shadow-lg  transition-all duration-300 ease-out placeholder:text-blue-500 "
        type="text"
        placeholder="جستجو بر اساس نام ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchUsers;
