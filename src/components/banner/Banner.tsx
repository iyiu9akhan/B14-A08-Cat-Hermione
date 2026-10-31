import React from "react";
import Link from "next/link";
import Map from "./Map";
import Container from "../container/Container";
import { BsFillCalendarEventFill } from "react-icons/bs";

const Banner = () => {
  return (
    <div>
      <Container>
        <div className="p-px rounded-t-2xl bg-linear-to-b from-borderSoft from-30% to-transparent to-80%">
          <div className="flex items-center justify-between py-20 px-10 bg-gradient-color rounded-t-[calc(var(--radius-2xl)-1px)]">
            <div>
              <h1 className="font-headingFont text-headingColor text-[70px] max-w-130 leading-19 mb-4 font-medium">
                Empowering lives across every corner of Bangladesh
              </h1>
              <p className="max-w-130 font-textFont text-bodyText text-[18px] font-medium mb-8">
                Creating pathways for sustainable growth and equal access for
                all. Join us in shaping a fairer, more inclusive tomorrow.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-9 py-3 bg-brand font-textFont text-textColor font-semibold rounded-b-2xl rounded-r-2xl shadow-lg capitalize"
              >
                <BsFillCalendarEventFill />
                <span>Plan Your Event</span>
              </Link>
            </div>
            <Map />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;