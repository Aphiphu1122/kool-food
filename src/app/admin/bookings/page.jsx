"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/booking");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);

        // นับจำนวนการจองตามวัน
        const bookingCounts = data.reduce((acc, booking) => {
          const date = new Date(booking.date).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // แปลงข้อมูลให้เข้ากับ Recharts
        const formattedData = Object.keys(bookingCounts).map((date, index) => ({
          date,
          bookings: bookingCounts[date],
          color: index % 2 === 0 ? "#ff6b6b" : "#1d4ed8",
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-[#ffffff]">
      <Navbar />

      <div className="p-6 pt-16 flex-grow">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">รายการจองทั้งหมด</h1>

        {loading ? (
          <p className="text-center text-gray-700">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="text-red-500 text-center">❌ {error}</p>
        ) : (
          <>
            <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-xl p-6 mb-6 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">จำนวนการจองแต่ละวัน</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" /> 
                  <XAxis dataKey="date" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="bookings"
                    fill="#DC0000"
                    label={{ position: "top", fill: "#333", fontSize: 12 }}
                    shape={(props) => {
                      const { x, y, width, height, payload } = props;
                      return (
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={payload.color || "#DC0000"}
                          rx="5"
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-max mt-4 border border-gray-400 shadow-lg rounded-lg text-sm text-gray-800">
                <thead>
                  <tr className="bg-[#ffffff] border-b border-gray-400 text-left">
                    <th className="border-r border-gray-400 px-4 py-2">ชื่อ</th>
                    <th className="border-r border-gray-400 px-4 py-2">เบอร์โทร</th>
                    <th className="border-r border-gray-400 px-4 py-2">วันที่</th>
                    <th className="border-r border-gray-400 px-4 py-2">เวลา</th>
                    <th className="px-4 py-2">จำนวนคน</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking._id || index} className="border-b border-gray-400 hover:bg-[#ffffff]">
                      <td className="border-r border-gray-400 px-4 py-2">{booking.name}</td>
                      <td className="border-r border-gray-400 px-4 py-2">{booking.phone}</td>
                      <td className="border-r border-gray-400 px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="border-r border-gray-400 px-4 py-2">{booking.time}</td>
                      <td className="px-4 py-2 text-center">{booking.numPeople}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
