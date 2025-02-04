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
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setUser(data.user);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 flex-grow text-center">
        <h3 className="text-2xl font-bold mb-4">Hi Welcome To KoolFood</h3>
        <p className="text-lg">Hello, <span className="font-semibold">{user?.email || "User"}</span>!</p>

        {/* Image Grid with Descriptions and Booking Buttons */}
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
          {[{
            image1: "/food_1.jpg", image2: "/food_2.jpg",
            title: "Kool Food - ซอยพะเยา เปิดใหม่",
            description: "เมนูเนื้อริบอายสุดพรีเมียม พร้อมบรรยากาศร้านสุดอบอุ่น |⭐ 4.5"
          }, {
            image1: "/food_3.jpg", image2: "/food_4.jpg",
            title: "บรรยากาศหรูหรา - เมนูอาหารญี่ปุ่นสดใหม่",
            description: "🍣 เมนูแนะนำ: ซาชิมิสดใหม่ และ ซูชิหลากหลาย |⭐ 5"
          }, {
            image1: "/food_5.jpg", image2: "/food_6.jpg",
            title: "โปรโมชั่นสุดคุ้ม - ส่วนลดพิเศษ 50%",
            description: "🔥 จองเลย! รับส่วนลดพิเศษสำหรับลูกค้าใหม่ |⭐ 4.5"
          }].map((item, index) => (
            <div key={index} className="text-center">
              <Swiper navigation modules={[Navigation]} spaceBetween={10} slidesPerView={1} className="w-full h-60">
                <SwiperSlide>
                  <Image src={item.image1} alt={item.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={item.image2} alt={item.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </SwiperSlide>
              </Swiper>
              <p className="mt-2 text-gray-700 font-semibold">{item.title}</p>
              <p className="text-gray-600">{item.description}</p>
              <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600 transition w-full">จองเลย!</button>
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