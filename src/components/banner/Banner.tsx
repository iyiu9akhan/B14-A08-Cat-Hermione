import React from "react";
import Map from "./Map";
import Container from "../container/Container";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { ButtonLink } from "@/components/ui/ButtonLink";

const Banner = () => {
  return (
    <div className="bg-gradient-color py-20">
      <Container>
        <div className="p-px rounded-t-2xl bg-linear-to-b">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h1 className="font-headingFont text-headingColor text-[36px] sm:text-[48px] md:text-[56px] lg:text-[70px] leading-tight lg:leading-19 max-w-130 mb-4 font-medium">
                Empowering lives across every corner of Bangladesh
              </h1>
              <p className="max-w-130 font-textFont text-bodyText text-[18px] font-medium mb-8">
                Creating pathways for sustainable growth and equal access for
                all. Join us in shaping a fairer, more inclusive tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <ButtonLink
                  href="/#campaigns"
                  icon={<TbReportSearch size={23} />}
                  spinnerSize={23}
                  className="inline-flex items-center gap-2 px-9 py-3 bg-brand font-textFont text-textColor font-semibold rounded-b-2xl rounded-r-2xl shadow-lg capitalize scale-100 hover:scale-105 transition-transform duration-300"
                >
                  <span>upcoming events</span>
                </ButtonLink>
                <ButtonLink
                  href="/create-event"
                  icon={<BsFillCalendarEventFill className="text-brand" />}
                  spinnerSize={18}
                  className="inline-flex items-center gap-2 px-9 py-3 font-textFont text-headingColor font-semibold rounded-b-2xl rounded-l-2xl shadow-lg capitalize border-borderSoft border scale-100 hover:scale-105 transition-transform duration-300"
                >
                  <span>Plan Your Event</span>
                </ButtonLink>
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
