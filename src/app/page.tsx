import Banner from "@/components/banner/Banner";
import Feature from "@/components/feature/Feature";
import Newsletter from "@/components/newsletter/Newsletter";
import Showcase from "@/components/showcase/Showcase";
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Banner />
        <Feature />
        <UpcomingEvents />
        <Showcase/>
        <Newsletter/>
      </main>
    </div>
  );
}
