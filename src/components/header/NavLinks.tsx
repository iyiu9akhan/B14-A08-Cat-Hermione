import Link from "next/dist/client/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className="hidden sm:flex items-center gap-8">
      <Link
        href="/#campaigns"
        className="text-headingColor font-textFont font-semibold hover:text-secondaryText/70 transition-colors duration-200"
      >
        Upcoming Events
      </Link>
    </div>
  );
};

export default NavLinks;
