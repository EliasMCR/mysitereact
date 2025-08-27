export const HeaderDash = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b bg-white
     border-gray-200 flex justify-between items-center h-20 p-4
     shadow-[10px_-2px_10px_rgba(0,0,0,0.1)]"
    >
      <p className="text-4xl text-blue-500">Dashboard</p>
      <div className="lg:hidden flex justify-center items-center text-gray-600 hover:text-blue-500 cursor-pointer">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "32px" }}
        >
          menu
        </span>
      </div>
    </header>
  );
};
