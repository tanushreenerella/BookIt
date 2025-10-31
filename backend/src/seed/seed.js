import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "../models/Experience.js";

dotenv.config({ path: "../../.env" });
console.log("MongoDB URI:", process.env.MONGODB_URI);

const data = [
  {
    title: "Coffee Trail",
    location: "Coorg",
    description: "Curated small-group experience. Certified guide.",
    price: 1299,
    image: "/images/img2.png",
    about: "Scenic routes and safety briefing.",
    slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
  },
  {
  title: "Scuba Diving",
  location: "Goa",
  description: "Dive into the Arabian Sea with certified instructors.",
  price: 2499,
  image: "/images/img3.jpg",
  about: "Perfect for beginners — includes equipment and safety briefing.",
  slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "Coffee Plantation",
  location: "Chikmagalur",
  description: "Walk through scenic coffee estates and learn bean-to-cup process.",
  price: 699,
  image: "/images/img4.jpg",
  about: "Includes tasting session and local breakfast.",
  slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "Paragliding",
  location: "Bir Billing",
  description: "Soar above the mountains with experienced pilots.",
  price: 3499,
  image: "/images/img5.jpg",
  about: "20-minute flight with photo and video capture included.",
slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "Beach Yoga",
  location: "Gokarna",
  description: "Morning yoga by the sea with certified instructors.",
  price: 599,
  image: "/images/img6.jpg",
  about: "Relax, stretch, and meditate to ocean waves.",
  slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "Desert Safari",
  location: "Jaisalmer",
  description: "Thrilling dune bashing and sunset camel ride.",
  price: 1299,
  image: "/images/img7.jpg",
  about: "Includes local dinner and folk performance.",
  slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "Cave Trek",
  location: "Badami",
  description: "Explore ancient rock-cut caves and temples.",
  price: 799,
  image: "/images/img8.jpg",
  about: "Guided trek with historical insights.",
 slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
},
{
  title: "River Rafting",
  location: "Rishikesh",
  description: "Ride the rapids on the Ganges with expert guides.",
  price: 999,
  image: "/images/img9.jpg",
  about: "Includes safety gear and 8 km rafting stretch.",
  slots: [
  {
    date: "2025-10-22",
    times: [
      { time: "07:00 am", available: 10 },
      { time: "09:00 am", available: 8 },
    ],
  },
  {
    date: "2025-10-23",
    times: [
      { time: "08:00 am", available: 12 },
    ],
  },
],
}

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await Experience.deleteMany({});
  await Experience.insertMany(data);
  console.log("✅ Seed complete");
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
