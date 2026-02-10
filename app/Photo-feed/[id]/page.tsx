import React from "react";
import { AnimalImage, animalImages } from "../animal";
import Image from "next/image";
import Link from "next/link";

export default async function ImageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo: AnimalImage | undefined = animalImages.find((p) => p.id === id);

  if (!photo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-light">Image not found</h2>
        <Link
          href="/photo-feed/"
          className="mt-4 text-amber-500 hover:underline"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          href="/photo-feed"
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          BACK TO COLLECTION
        </Link>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl shadow-2xl bg-white">
          <Image
            src={photo.src}
            alt="Selected animal"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] text-xs uppercase">
              Featured Portrait
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mt-2 leading-tight">
              {photo.description || "Animal Species"}
            </h1>
            <div className="h-1 w-24 bg-amber-400 mt-6"></div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed max-w-md">
            Capturing the raw beauty and character of wildlife in their natural
            essence. This piece highlights the unique features and majestic
            presence of the subject.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Artist
              </p>
              <p className="text-sm font-medium text-gray-800">TSkimm</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Year
              </p>
              <p className="text-sm font-medium text-gray-800">2024</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
