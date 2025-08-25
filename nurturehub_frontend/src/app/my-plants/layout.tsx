import { Navbar } from '@/components/navbar';

export default function MyPlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
