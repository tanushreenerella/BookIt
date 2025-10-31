"use client";

// 🚫 Disable static generation for this page
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref") || "HUF56&SO";

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-white relative">
        <img
          className="text-green-500"
          height={80}
          style={{ marginTop: "75px", opacity: 1 }}
          src="/images/ep_success-filled.png"
          alt="Success"
        />

        <h1
          className="text-[32px] font-normal leading-[10] mt-[8]"
          style={{ fontFamily: "Inter" }}
        >
          Booking Confirmed
        </h1>

        <p
          className="text-[20px] font-normal leading-6 text-gray-600 mt-2"
          style={{ fontFamily: "Inter" }}
        >
          Ref ID: {refId}
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-10 w-[138px] h-9 bg-[#E3E3E3] rounded-sm
                     text-[16px] font-medium hover:bg-gray-300 transition cursor-pointer"
        >
          Back to Home
        </button>
      </main>
    </>
  );
}
