import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-black p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <div className="space-x-6">
          <Link href="/admin" className="hover:text-gray-300 transition">แดชบอร์ด</Link>
          <Link href="/admin/bookings" className="hover:text-gray-300 transition">รายการจอง</Link>
        </div>
      </div>
    </nav>
  );
}
