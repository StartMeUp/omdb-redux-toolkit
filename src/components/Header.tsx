import Avatar from "../assets/img/avatar.png";

const Header = () => {
  return (
    <header className="p-4 bg-neutral-600">
      <div className="container mx-auto flex justify-between content-center">
        <h1 className="flex flex-col justify-center text-3xl">My movie App</h1>
        <img src={Avatar} className="rounded-full max-w-[50px]" />
      </div>
    </header>
  );
};

export default Header;
