import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { BsArrowLeft, BsPencilSquare } from "react-icons/bs";
import Container from "@/components/container/Container";
import EditEventForm from "@/components/events/EditEventForm";
import { auth } from "@/lib/auth";
import { getEventById } from "@/lib/events";

export const metadata = {
  title: "Edit Event | Hermione",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditEventPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email) redirect("/login");

  const event = await getEventById(id);
  if (!event || !event._id) notFound();

  if (event.organizerEmail !== session.user.email) redirect(`/events/${id}`);

  return (
    <div className="bg-gradient-color py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/events/${id}`}
            className="mb-6 inline-flex items-center gap-2 font-textFont text-[14px] font-semibold text-bodyText transition-colors duration-300 hover:text-brand"
          >
            <BsArrowLeft size={16} />
            Back to Event
          </Link>

          <div className="rounded-3xl border border-borderSoft bg-background p-6 shadow-lg sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 font-textFont text-[13px] font-bold text-brand">
              <BsPencilSquare size={14} />
              Edit Event
            </span>

            <h1 className="mt-4 mb-8 font-headingFont text-[40px] font-medium leading-tight text-headingColor sm:text-[48px]">
              Update your event
            </h1>

            <EditEventForm event={event} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditEventPage;