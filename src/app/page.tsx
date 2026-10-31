import Banner from "@/components/banner/Banner";
import Feature from "@/components/feature/Feature";
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Banner />
        <Feature />
        <UpcomingEvents />
      </main>
    </div>
  );
}
