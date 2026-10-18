export default function Footer() {
  return (
    <footer className="bg-green-800 py-7 px-4 sm:px-6 lg:px-16 w-full print:hidden">
      <div className="container mx-auto text-white text-sm">&copy; {new Date().getFullYear()} Universitas Ibn Khaldun Bogor. All rights reserved.</div>
    </footer>
  );
}
