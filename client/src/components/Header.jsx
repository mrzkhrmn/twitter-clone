export const Header = () => {
  return (
    <header className="max-w-6xl  mx-auto">
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className="text-xl text-white font-semibold">Twitter-Clone</h1>
        <div>
          <input
            placeholder="Search..."
            id="search"
            className="p-2 rounded-md w-80"
          />
        </div>
        <img
          className="w-12 h-12 object-cover"
          src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          alt="profile image"
        />
      </div>
    </header>
  );
};
