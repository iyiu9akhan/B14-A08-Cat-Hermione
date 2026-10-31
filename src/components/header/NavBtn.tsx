import Link from "next/link";

const NavBtn = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/registration"
        className="rounded-b-2xl rounded-r-2xl bg-brand px-4 py-2 text-sm font-semibold capitalize font-textFont text-textColor shadow-sm"
      >
        registration
      </Link>
    </div>
  );
};

export default NavBtn;
