"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { FaArrowLeft } from 'react-icons/fa';

function AboutfoodPage() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState("");
    const [numPeople, setNumPeople] = useState(""); // จำนวนคน
    const [date, setDate] = useState(""); // วันที่

    return (
        <div>
            <Navbar />

            {/* ปุ่มย้อนกลับ */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                <button
                    onClick={() => router.push('/dashboard')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#333',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    <FaArrowLeft size={20} />
                    <span>ย้อนกลับ</span>
                </button>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginTop: '20px',
                    gap: '20px'
                }}
            >
                
                {/* กรอบรูปใหญ่ (ซ้าย) */}
                <div
                    style={{
                        backgroundColor: '#f5f5f5',
                        width: '700px',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '2px solid #ddd',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* รูปใหญ่ */}
                    <div style={{ marginBottom: '20px' }}>
                        <img
                            src="/food_1.jpg"
                            alt="Large Food Image"
                            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </div>

                    {/* กล่องข้อความด้านใน */}
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            padding: '15px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {/* แถวเมนูแนะนำ */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                เมนูแนะนำ
                            </p>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'red' }}>
                                -50%
                            </p>
                        </div>

                        {/* คำอธิบายโปรโมชั่น */}
                        <p style={{ fontSize: '12px', color: '#333', marginTop: '5px' }}>
                            โปรโมชั่นไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นๆของทางร้านอาหารได้
                        </p>

                        {/* รายการเมนู */}
                        {["บุฟเฟ่001", "บุฟเฟ่002", "บุฟเฟ่003", "บุฟเฟ่004"].map((menu, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '10px'
                                }}
                            >
                                <p style={{ fontSize: '16px', color: '#333' }}>
                                    {menu}
                                </p>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        THB 1,499
                                    </p>
                                    <p style={{ fontSize: '14px', textDecoration: 'line-through', color: '#888' }}>
                                        THB 1,999
                                    </p>
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

                {/* กรอบรูปขวา */}
                <div
                    style={{
                        backgroundColor: '#f5f5f5',
                        width: '400px',
                        height: '500px', // ขยายให้ช่องที่เพิ่ม
                        padding: '15px',
                        borderRadius: '10px',
                        border: '2px solid #ddd',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    {/* รูปภาพเล็ก */}
                    <img
                        src="/food_2.jpg"
                        alt="Small Food Image"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />

                    {/* ข้อความใต้รูปภาพ */}
                    <p style={{ fontSize: '14px', color: '#333', marginTop: '10px', textAlign: 'left' }} >
                        อาหารจานพิเศษที่ไม่ควรพลาด
                        <br /> วัตถุดิบคุณภาพระดับพรีเมียม
                    </p>

                    {/* เวลาทำการ + ค่าความนิยม */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        {/* เวลาทำการ */}
                        <div style={{ flex: 1 }}>
                            <select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <option value="">เวลาทำการ</option>
                                <option value="option1">11:00 - 14:00</option>
                                <option value="option2">17:00 - 21:00</option>
                                <option value="option3">ทั้งวัน</option>
                            </select>
                        </div>

                        {/* ค่าความนิยม 4.5 ดาว */}
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: '#333', marginRight: '-110%' }}>
                            ⭐ 4.5
                        </div>
                    </div>

                    {/* ช่องกรอก "จำนวนคน" และ "วันที่" */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        {/* จำนวนคน */}
                        <input
                            type="number"
                            placeholder="จำนวนคน"
                            value={numPeople}
                            onChange={(e) => setNumPeople(e.target.value)}
                            style={{
                                flex: 0.5,
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        />

                        {/* วันที่ */}
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* ปุ่ม "จองเลย" */}
                    <button
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#ff6f61',
                            color: 'white',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        จองเลย
                    </button>
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default AboutfoodPage;