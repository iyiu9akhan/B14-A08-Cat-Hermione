import Link from "next/link";
import { BsArrowLeft, BsStars } from "react-icons/bs";
import Container from "@/components/container/Container";
import CreateEventForm from "@/components/events/CreateEventsForm"

export const metadata = {
  title: "Create Event | Hermione",
};

const CreateEventPage = () => {
  // TODO: logged in user er email auth theke niye ashbe
  const organizerEmail = "user@example.com";

  return (
    <div className="bg-gradient-color py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#campaigns"
            className="mb-6 inline-flex items-center gap-2 font-textFont text-[14px] font-semibold text-bodyText transition-colors duration-300 hover:text-brand"
          >
            <BsArrowLeft size={16} />
            Back to Upcoming Events
          </Link>

          <div className="rounded-3xl border border-borderSoft bg-background p-6 shadow-lg sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 font-textFont text-[13px] font-bold text-brand">
              <BsStars size={14} />
              Social Service Drive
            </span>

            <h1 className="mt-4 font-headingFont text-[40px] font-medium leading-tight text-headingColor sm:text-[48px]">
              Create a Community Event
            </h1>
            <p className="mt-2 mb-8 font-textFont text-[15px] font-medium text-bodyText">
              Organize a local relief effort, environmental cleanup, or
              community support drive.
            </p>

            <CreateEventForm organizerEmail={organizerEmail} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateEventPage;