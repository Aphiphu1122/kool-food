"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";


function AboutfoodPage() {
  const router = useRouter();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);

  const handleBooking = () => {
    router.push('/booking');
    };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("❌ Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async () => {
    if (review.trim() === "") return;

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "Guest", comment: review, rating }),
      });

      const data = await response.json();
      if (data.success) {
        setReviews([data.review, ...reviews]);
        setReview("");
        setRating(5);
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* ปุ่มย้อนกลับ */}
      <div style={{ padding: "10px 20px" }}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: "#333",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <FaArrowLeft size={20} />
          <span>ย้อนกลับ</span>
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
        {/* กรอบซ้าย */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            width: "700px",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #ddd",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* รูปอาหาร */}
          <img src="/food_1.jpg" alt="อาหาร" style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }} />

          {/* เมนูแนะนำ */}
          <div style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "15px", marginTop: "20px" }}>
            <h3>เมนูแนะนำ</h3>
            <p style={{ color: "red" }}>-50%</p>
            <p>โปรโมชั่นไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้</p>

            {["บุฟเฟ่001", "บุฟเฟ่002", "บุฟเฟ่003", "บุฟเฟ่004"].map((menu, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{menu}</p>
                <div>
                  <p><b>THB 259</b></p>
                  <p style={{ textDecoration: "line-through", color: "#888" }}>THB 299</p>
                </div>
              </div>
            ))}
          </div>

          {/* แผนที่นะ */}
          <div style={{ marginTop: '20px' }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.0809851607!2d99.92940488009347!3d19.035379199219932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d8330f050e8c2b%3A0xaf2863e5025ed99f!2zT2theSBTaGFidSDguKrguLLguILguLIg4LihLuC4nuC4sOC5gOC4ouC4sg!5e0!3m2!1sth!2sth!4v1738905402768!5m2!1sth!2sth"
                            width="600" 
                            height="450" 
                            style={{ border: '0' }} 
                            allowFullScreen=""
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* คำอธิบายใต้แผนที่ */}
                    <p style={{ fontSize: '14px', color: '#333', marginTop: '10px' }}>
                        ร้านของเราตั้งอยู่ที่ศูนย์การค้าชั้นนำ มีที่จอดรถสะดวกสบาย และการเดินทางที่ง่ายดายสำหรับทุกท่าน
                    </p>

                    {/* คำแนะนำร้านอาหาร */}
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            เรามีหลากหลายเมนูที่เหมาะสำหรับทุกคน ไม่ว่าจะเป็นบุฟเฟ่ต์หรืออาหารจานเดียว
                        </p>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            บรรยากาศในร้านเหมาะแก่การมาทานอาหารกับครอบครัว หรือจัดงานเลี้ยงสังสรรค์ต่างๆ
                        </p>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            เรามีการใช้วัตถุดิบที่สดใหม่ทุกวัน เพื่อให้คุณได้สัมผัสรสชาติที่ดีที่สุด
                        </p>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            ไม่ว่าคุณจะเลือกทานอาหารประเภทไหน เรามั่นใจว่าคุณจะได้รับประสบการณ์ที่ยอดเยี่ยมจากเรา
                        </p>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            ร้านของเราให้บริการทั้งแบบบุฟเฟ่ต์และแบบจานเดียว สามารถเลือกเมนูตามความชอบได้
                        </p>
                        <p style={{ fontSize: '14px', color: '#333' }}>
                            ทีมงานของเราพร้อมให้บริการและตอบโจทย์ความต้องการของลูกค้าอย่างเต็มที่
                        </p>
                    </div>
                </div>

        {/* กรอบขวา */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            width: "400px",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #ddd",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* รูปภาพ */}
          <img src="/food_2.jpg" alt="อาหารจานพิเศษ" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />

          <p style={{ fontSize: '14px', color: '#333', marginTop: '10px', textAlign: 'left' }} >
                        อาหารจานพิเศษที่ไม่ควรพลาด
                        <br /> วัตถุดิบคุณภาพระดับพรีเมียม
                    </p>

                   {/* ปุ่ม "จองเลย" */}
                   <button
                        onClick={handleBooking} 
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#dc0000',
                            color: 'white',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        จองเลย!
                        </button> 

          {/* ส่วนของรีวิว */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            width: "400px",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #ddd",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>📝 รีวิวร้านอาหาร</h3> </div>

          {/* ช่องพิมพ์รีวิว */}
          <textarea
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
            rows="3"
            placeholder="พิมพ์รีวิวของคุณที่นี่..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* เลือกคะแนน */}
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} ⭐
              </option>
            ))}
          </select>

          {/* ปุ่มส่งรีวิว */}
          <button
            onClick={handleReviewSubmit}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ส่งรีวิว
          </button>

          {/* แสดงรีวิวจาก MongoDB */}
          {reviews.length > 0 && (
            <div style={{ marginTop: "10px", maxHeight: "300px", overflowY: "auto" }}>
              {reviews.map((r) => (
                <div
                  key={r._id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>{r.user}</p>
                      <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>{new Date().toLocaleDateString("th-TH")}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: "10px" }}>{r.comment}</p>
                  <div style={{ color: "gold" }}>
                    {Array(r.rating).fill("⭐").join(" ")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutfoodPage;
