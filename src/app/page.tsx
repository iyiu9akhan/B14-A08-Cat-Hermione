import Map from "@/components/banner/Map";
import Container from "@/components/container/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-secondaryText font-headingStyle text-[70px] max-w-130 leading-19 mb-4 font-medium">
                Empowering lives across every corner of Bangladesh
              </h1>
              <p className="max-w-130 text-secondaryText font-textStyle text-[18px] font-medium mb-8">
                Creating pathways for sustainable growth and equal access for
                all. Join us in shaping a fairer, more inclusive tomorrow.
              </p>
              <Link href="#">
                <p className="px-9 py-3 bg-brand text-secondaryText font-textStyle font-semibold rounded-full shadow-lg inline capitalize">
                  Plan Your Event
                </p>
              </Link>
            </div>
            <Map />
          </div>
        </Container>
      </main>
    </div>
  );
}
