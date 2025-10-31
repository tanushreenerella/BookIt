import { Experience } from "@/types/experience";
import Link from "next/link";

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <div
      className="
        bg-white shadow-md rounded-lg overflow-hidden 
        transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {experience.title}
          </h2>
          <span className="text-sm text-gray-500">{experience.location}</span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-800 font-semibold">From ₹{experience.price}</p>

          <Link href={`/experience/${experience._id}`}>
            <button
              className="
                bg-[#FFD643] hover:bg-[#ffcd1c] 
                px-4 py-2 rounded-md font-medium text-black 
                transition duration-300 cursor-pointer
              "
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
