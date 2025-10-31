"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";
import { fetchExperiences } from "@/lib/api";

interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
}

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchExperiences()
      .then((data) => {
        if (!mounted) return;
        // normalize if api returns { experiences: [...] }
        const list: Experience[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.experiences)
          ? data.experiences
          : [];
        setExperiences(list);
        setFiltered(list);
      })
      .catch((err) => {
        console.error("Error fetching experiences:", err);
        setExperiences([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = (query: string) => {
    // When query is empty -> restore full list
    if (!query) {
      setFiltered(experiences);
      return;
    }

    const lower = query.toLowerCase();
    const filteredData = experiences.filter((exp) => {
      return (
        (exp.title || "").toLowerCase().includes(lower) ||
        (exp.location || "").toLowerCase().includes(lower) ||
        (exp.description || "").toLowerCase().includes(lower)
      );
    });

    setFiltered(filteredData);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} debounceMs={150} />
      <main className="min-h-screen bg-[#F9F9F9] px-16 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading experiences...</p>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
            {filtered.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No results found.</p>
        )}
      </main>
    </>
  );
}
