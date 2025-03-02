"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include", // ✅ ดึงข้อมูลโดยใช้ Cookie
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Unauthorized:", data);
          router.push("/login"); // ✅ ถ้าไม่ได้ Login ให้กลับไปหน้า Login
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("🔥 Fetch user error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">กำลังโหลดข้อมูล...</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 flex-grow text-center">
        <h3 className="text-2xl font-bold mb-4">Hi Welcome To KoolFood</h3>
        <p className="text-lg">
          Hello, <span className="font-semibold">{user?.email || "User"}</span>!
        </p>

        {/* Image Grid with Descriptions and Booking Buttons */}
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
          {[
            {
              image1: "/food_1.jpg",
              image2: "/food_2.jpg",
              title: "Kool Food - ซอยพะเยา เปิดใหม่",
              description:
                "เมนูเนื้อริบอายสุดพรีเมียม พร้อมบรรยากาศร้านสุดอบอุ่น |⭐ 4.5",
            },
            {
              image1: "/food_3.jpg",
              image2: "/food_4.jpg",
              title: "OKAY SHABU - บรรยากาศหรูหรา",
              description: "🍣 เมนูแนะนำ: ซาชิมิสดใหม่ และ ซูชิหลากหลาย |⭐ 5",
            },
            {
              image1: "/food_5.jpg",
              image2: "/food_6.jpg",
              title: "OKAY SHABU สาขา2 หน้ามหาวิทยาลัยพะเยา เปิดใหม่!!",
              description: "🔥 จองเลย! รับส่วนลดพิเศษสำหรับลูกค้าใหม่ |⭐ 4.5",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <Swiper
                navigation
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                className="w-full h-60"
              >
                <SwiperSlide>
                  <Image
                    src={item.image1}
                    alt={item.title}
                    width={500}
                    height={250}
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={item.image2}
                    alt={item.title}
                    width={500}
                    height={250}
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
              </Swiper>
              <p className="mt-2 text-gray-700 font-semibold">{item.title}</p>
              <p className="text-gray-600">{item.description}</p>
              <button
                onClick={() => router.push(`/aboutfood`)}
                className="bg-black text-white px-6 py-2 rounded mt-4 hover:bg-gray-800 transition w-full"
              >
                แสดงรายละเอียดเพิ่มเติม!
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded mt-6 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;
