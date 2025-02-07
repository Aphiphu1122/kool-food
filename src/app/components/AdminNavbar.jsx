import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <div>
          <Link href="/admin">แดชบอร์ด</Link>
          <Link href="/admin/bookings" className="ml-4">รายการจอง</Link>
        </div>
      </div>
    </nav>
  );
}
