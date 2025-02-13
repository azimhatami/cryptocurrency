function Layout({ children }) {
  return (
    <div className="flex flex-col items-center gap-y-10">
      <header className="bg-[#76ABAE]/40 w-[80%] h-12 rounded-md flex items-center justify-between !px-4">
        <h1 className="text-xl font-semibold">Crypto App</h1>
        <p>Azim Hatami | React project</p>
      </header>
      {children}
      <footer className="h-50 flex place-items-end">
        <p className="text-[#76ABAE]/70">THE END</p>
      </footer>
    </div>
  );
}

export default Layout;
