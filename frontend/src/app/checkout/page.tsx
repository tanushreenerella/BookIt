"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { createBooking, validatePromo, fetchExperienceById } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const search = useSearchParams();
 const [discount, setDiscount] = useState(0);
  const expId = search.get("exp");
  const date = search.get("date");
  const time = search.get("time");
  const qty = Number(search.get("qty") || 1);
  const total = Number(search.get("total") || 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    promo: "",
    agree: false,
  });

  const [exp, setExp] = useState<any>(null);
  useEffect(() => {
  if (expId) {
    const id = Array.isArray(expId) ? expId[0] : expId; 
    fetchExperienceById(id)
      .then((data) => {
        // 🧠 Flatten the nested slot/times structure
        const flatSlots =
          data.slots?.flatMap((slot: any) =>
            slot.times.map((t: any) => ({
              date: slot.date,
              time: t.time,
              available: t.available,
            }))
          ) || [];
        setExp({ ...data, slots: flatSlots });
      })
      .catch((err) => console.error("Error fetching experience:", err));
  }
}, [expId]);


  // ✅ Handle promo validation
 const handlePromoApply = async () => {
  if (!form.promo.trim()) return alert("Enter promo code first!");
  const res = await validatePromo(form.promo);
  if (res.valid) {
    setDiscount(res.discount);
    alert(`Promo applied ✅ ${res.discount}% off`);
  } else {
    setDiscount(0);
    alert("Invalid promo ❌");
  }
};

  // ✅ Handle booking confirmation
  const handleConfirm = async () => {
    const res = await createBooking({
      experienceId: expId,
      name: form.name,
      email: form.email,
      date,
      time,
      qty,
      promo: form.promo,
      amount: total,
    });

    const refId = res?.bookingId || "HD-" + Math.floor(Math.random() * 99999);
    router.push(`/confirmation?ref=${refId}`);
  };

  return (
    <>
      <Navbar />

      {/* ---------- Header ---------- */}
      <div className="flex items-center pt-6 pb-5 px-[124px] gap-3">
        <button
          onClick={() => router.back()}
          className="text-[24px] font-medium cursor-pointer"
        >
          ←
        </button>
        <h2 className="text-[24px] font-semibold">Checkout</h2>
      </div>

      {/* ---------- Main ---------- */}
      <main className="max-w-[1440px] mx-auto px-[124px] flex flex-col md:flex-row md:gap-10">
        {/* ---------- Left form ---------- */}
        <div className="w-full md:w-[65%] bg-[#F9F9F9] rounded-xl p-8 flex flex-col gap-4 h-1/4">
          {/* Full Name + Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1 text-[14px]">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-[42px] px-3 rounded-lg bg-[#EDEDED] outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1 text-[14px]">Email</label>
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-[42px] px-3 rounded-lg bg-[#EDEDED] outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Promo */}
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <input
              type="text"
              placeholder="Promo code"
              value={form.promo}
              onChange={(e) => setForm({ ...form, promo: e.target.value })}
              className="flex-1 h-[42px] px-3 rounded-lg bg-[#EDEDED] outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={handlePromoApply}
              className="h-[42px] w-[100px] bg-black text-white rounded-lg hover:opacity-80 transition"
            >
              Apply
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              className="w-4 h-4"
            />
            <p className="text-[14px] text-gray-700">
              I agree to the terms and safety policy
            </p>
          </div>
        </div>

        {/* ---------- Right Summary ---------- */}
        {/* ---------- Right Summary ---------- */}
<div className="w-full md:w-[35%] bg-[#EFEFEF] rounded-xl p-8 flex flex-col justify-between mt-8 md:mt-0">
  <div className="flex flex-col gap-3 text-[15px] text-gray-800">
    <div className="flex justify-between">
      <p>Experience</p>
      <p>{exp?.title || "—"}</p>
    </div>
    <div className="flex justify-between">
      <p>Date</p>
      <p>{date}</p>
    </div>
    <div className="flex justify-between">
      <p>Time</p>
      <p>{time}</p>
    </div>
    <div className="flex justify-between">
      <p>Qty</p>
      <p>{qty}</p>
    </div>

    {/* 💸 Subtotal */}
    <div className="flex justify-between">
      <p>Subtotal</p>
      <p>₹{total}</p>
    </div>

    {/* ✅ Discount (only if valid promo applied) */}
    {discount > 0 && (
      <div className="flex justify-between text-green-600">
        <p>Discount ({discount}%)</p>
        <p>-₹{(total * discount) / 100}</p>
      </div>
    )}

    {/* 🧾 Final total */}
    <div className="flex justify-between font-semibold border-t border-gray-300 pt-2">
      <p>Total</p>
      <p>₹{(total - (total * discount) / 100).toFixed(2)}</p>
    </div>
  </div>

  <button
    disabled={!form.name || !form.email || !form.agree}
    onClick={handleConfirm}
    className={`w-full mt-6 h-12 rounded-lg font-medium text-[16px] transition cursor-pointer ${
      form.name && form.email && form.agree
        ? "bg-[#FFD643] text-black hover:bg-[#ffcd1c]"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
  >
    Pay and Confirm
  </button>
</div>

      </main>
    </>
  );
}
