import Taskbar from "@/components/Taskbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Add bottom padding to ensure content doesn't overlap with the taskbar */}
      <main className="">{children}</main>
      <Taskbar />
    </div>
  );
}
