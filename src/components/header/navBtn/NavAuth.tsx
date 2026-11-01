import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import NavBtn from "./NavBtn";

const NavAuth = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return <NavBtn user={user} />;
};

export default NavAuth;