// server component (no "use client" here)
import dynamic from "next/dynamic";

const ConfirmationClient = dynamic(() => import("./ConfirmationClient"), { ssr: false });

export default function Page() {
  return <ConfirmationClient />;
}
