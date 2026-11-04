import React from "react";
import Container from "../container/Container";
import NavLinks from "./NavLinks";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LogoLink from "./navBtn/LogoLink";
import NavAuth from "./navBtn/NavAuth";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 bg-background border-b border-borderSoft">
      <Container>
        <div className="flex items-center h-20 w-full">
          <LogoLink>
            <div className="flex items-center justify-between gap-3">
              <Image
                src="/brand-logo-light.png"
                alt="Hermione Logo"
                width={200}
                height={200}
                priority
                className="block dark:hidden h-20 w-auto"
              />

              <Image
                src="/brand-logo-dark.png"
                alt="Hermione Logo"
                width={200}
                height={200}
                priority
                className="hidden dark:block h-20 w-auto"
              />

              <p className="font-headingFont font-medium text-[30px] text-2xl text-headingColor">
                Hermione
              </p>
            </div>
          </LogoLink>

          <nav className="flex-1 flex items-center justify-center">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NavAuth />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
