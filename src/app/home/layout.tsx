import Taskbar from "@/components/Taskbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children} 
      <Taskbar />
    </section>
  );
}
