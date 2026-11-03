import Link from "next/link";
import { BsCalendar3 } from "react-icons/bs";

const NavLinks = () => {
  return (
    <div className="hidden sm:flex items-center gap-8">
      <Link
        href="/#campaigns"
        className="group relative inline-flex items-center gap-2 whitespace-nowrap rounded-md px-1 py-2 font-textFont font-semibold text-headingColor transition-colors duration-300 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <BsCalendar3
          size={16}
          className="text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        Upcoming Events
        <span className="absolute inset-x-1 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
    </div>
  );
};

export default NavLinks;