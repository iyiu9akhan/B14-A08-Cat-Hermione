import React from "react";
import Container from "../container/Container";
import NavLinks from "./NavLinks";
import NavBtn from "./NavBtn";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-20">
      <Container>
        <div className="flex items-center h-20 w-full">
          <Link href="/">
            <div className="flex items-center justify-between gap-3">
              <Image
                src="/brand-logo.png"
                alt="Hermione Logo"
                width={40}
                height={20}
                priority
              />
              <p className="font-textFont font-bold text-[30px] text-2xl">
                Hermione
              </p>
            </div>
          </Link>
          <nav className="flex-1 flex items-center justify-center">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-2">
            <NavBtn />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
