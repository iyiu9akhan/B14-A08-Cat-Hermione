import React from "react";
import Container from "../container/Container";
import Map from "../banner/Map";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-gradient-color py-10 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] border border-borderSoft bg-brand">
          <svg
            aria-hidden
            viewBox="0 0 600 700"
            preserveAspectRatio="none"
            className="absolute inset-y-0 left-0 hidden h-full w-[58%] text-background lg:block"
          >
            <path
              d="M0 0 H400 C500 110 370 250 450 370 C530 490 570 580 490 700 H0 Z"
              fill="currentColor"
            />
          </svg>

          <div className="relative grid min-h-170 grid-cols-1 lg:grid-cols-[58%_42%]">
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 flex w-[43%] items-center justify-center pl-6">
                <div className="w-full max-w-60">
                  <Map />
                </div>
              </div>

              <p className="absolute bottom-8 left-10 font-textFont text-[12px] font-medium text-bodyText opacity-70">
                © 2026 Hermione. Empowering lives across Bangladesh.
              </p>
            </div>

            <div className="flex items-center justify-center p-6 py-12 sm:p-10 lg:justify-start lg:pl-6">
              <div className="w-full max-w-sm">{children}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AuthLayout;
