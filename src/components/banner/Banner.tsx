import React from "react";
import Link from "next/link";
import Map from "./Map";
import Container from "../container/Container";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

const Banner = () => {
  return (
    <div className="bg-gradient-color  py-20">
      <Container>
        <div className="p-px rounded-t-2xl bg-linear-to-b">
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="font-headingFont text-headingColor text-[70px] max-w-130 leading-19 mb-4 font-medium">
                Empowering lives across every corner of Bangladesh
              </h1>
              <p className="max-w-130 font-textFont text-bodyText text-[18px] font-medium mb-8">
                Creating pathways for sustainable growth and equal access for
                all. Join us in shaping a fairer, more inclusive tomorrow.
              </p>
              <div className="flex  items-center gap-6 justify-between">
                <Link
                  href="/#campaigns"
                  className="inline-flex items-center gap-2 px-9 py-3 bg-brand font-textFont text-textColor font-semibold rounded-b-2xl rounded-r-2xl shadow-lg capitalize scale-100 hover:scale-105 transition-transform duration-300"
                >
                  <TbReportSearch size={23} />
                  <span>upcoming events</span>
                </Link>{" "}
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-9 py-3  font-textFont text-headingColor font-semibold rounded-b-2xl rounded-l-2xl shadow-lg capitalize border-borderSoft border scale-100 hover:scale-105 transition-transform duration-300"
                >
                  <BsFillCalendarEventFill className="text-brand" />
                  <span>Plan Your Event</span>
                </Link>
              </div>
            </div>
            <Map />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
