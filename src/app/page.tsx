import React, { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Feature from "@/components/feature/Feature";
import Newsletter from "@/components/newsletter/Newsletter";
import Showcase from "@/components/showcase/Showcase";
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents";
import UpcomingEventsSkeleton from "@/components/UpcomingEvents/UpcomingEventsSkeleton";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Banner />
        <Feature />
        <Suspense fallback={<UpcomingEventsSkeleton />}>
          <UpcomingEvents />
        </Suspense>
        <Showcase/>
        <Newsletter/>
      </main>
    </div>
  );
}
