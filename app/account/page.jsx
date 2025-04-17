import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  const userName =
    session.user.name.split(" ").at(0).at(0).toUpperCase() +
    session.user.name.split(" ").at(0).slice(1);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {userName}
    </h2>
  );
}
