import Taskbar from "@/components/Taskbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content fills available space */}
      <main className="flex-grow">{children}</main>
      {/* Taskbar at the bottom */}
      <Taskbar />
    </div>
  );
}
