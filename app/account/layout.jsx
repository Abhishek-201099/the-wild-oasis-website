import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-16 h-full">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
