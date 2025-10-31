"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchExperienceById } from "@/lib/api";
import Navbar from "@/components/Navbar";

interface TimeSlot {
  time: string;
  available: number;
}

interface Slot {
  date: string;
  times: TimeSlot[];
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  about: string;
  location: string;
  image: string;
  price: number;
  slots?: Slot[];
}

export default function ExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [exp, setExp] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperienceById(id)
        .then((data) => setExp(data))
        .catch((err) => console.error("Error fetching experience:", err));
    }
  }, [id]);

  if (!exp)
    return (
      <p className="text-center mt-10 text-gray-500">Loading experience...</p>
    );

  const slots = exp.slots || [];
  const uniqueDates = slots.map((s) => s.date);
  const selectedSlot = slots.find((s) => s.date === selectedDate);
  const times = selectedSlot ? selectedSlot.times : [];

  const subtotal = exp.price * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time first");
      return;
    }

    router.push(
      `/checkout?exp=${exp._id}&date=${selectedDate}&time=${selectedTime}&qty=${quantity}&total=${total}`
    );
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="flex items-center pt-6 pb-5 px-[124px] gap-3">
        <button
          onClick={() => router.back()}
          className="text-[20px] font-medium cursor-pointer"
        >
          ←
        </button>
        <h2 className="text-[20px] font-semibold">Details</h2>
      </div>

      {/* Main */}
      <main className="max-w-[1440px] mx-auto px-[124px] flex flex-col md:flex-row md:gap-10 mb-20">
        {/* Left side */}
        <div className="w-full md:w-[65%]">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-[380px] object-cover rounded-xl"
          />

          <div className="mt-8 flex flex-col gap-7">
            <div>
              <h2 className="text-[24px] font-semibold">{exp.title}</h2>
              <p className="text-[#4F4F4F] text-[15px] mt-2 leading-[22px] p-1 rounded-xl">
                {exp.description}
              </p>
            </div>

            {/* Choose Date */}
            <div>
              <h3 className="text-[18px] font-medium mb-2">Choose date</h3>
              <div className="flex flex-wrap gap-3">
                {uniqueDates.length > 0 ? (
                  uniqueDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime("");
                      }}
                      className={`px-4 py-2 rounded-md text-sm border transition-all ${
                        selectedDate === date
                          ? "bg-[#FFD643] border-[#FFD643] text-black"
                          : "border-gray-300 text-gray-500 hover:border-[#FFD643]"
                      }`}
                    >
                      {new Date(date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No available dates</p>
                )}
              </div>
            </div>

            {/* Choose Time */}
            <div>
              <h3 className="text-[18px] font-medium mb-2">Choose time</h3>
              <div className="flex flex-wrap gap-3">
                {times.length > 0 ? (
                  times.map((slot, index) => {
                    const soldOut = slot.available <= 0;
                    return (
                      <button
                        key={`${selectedDate}-${slot.time}-${index}`}
                        onClick={() => !soldOut && setSelectedTime(slot.time)}
                        disabled={soldOut}
                        className={`px-4 py-2 rounded-md text-sm flex items-center justify-center gap-1 border transition-all ${
                          soldOut
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "bg-[#FFD643] border-[#FFD643] text-black"
                            : "border-gray-300 text-gray-500 hover:border-[#FFD643]"
                        }`}
                      >
                        {slot.time}
                        {!soldOut ? (
                          <span className="text-xs text-red-500 ml-1">
                            {slot.available} left
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 ml-1">
                            Sold out
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">
                    Select a date to view available times
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="text-[18px] font-medium mb-2">About</h3>
              <p className="text-[#4F4F4F] text-[14px] leading-[22px] bg-gray-100 w-full p-1 rounded-lg">
                {exp.about}
              </p>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="w-full md:w-[35%] bg-[#EFEFEF] rounded-xl p-6 flex flex-col justify-between mt-8 md:mt-0 h-fit">
          <div className="flex flex-col gap-3 text-[15px] text-gray-800">
            <div className="flex justify-between">
              <p>Starts at</p>
              <p>₹{exp.price}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Quantity</p>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-lg"
                >
                  −
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Taxes</p>
              <p>₹{taxes}</p>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full mt-6 h-12 rounded-lg font-medium text-[16px] transition ${
              selectedDate && selectedTime
                ? "bg-[#FFD643] text-black hover:bg-[#ffcd1c]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </main>
    </>
  );
}
