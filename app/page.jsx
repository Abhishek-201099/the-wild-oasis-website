import Link from "next/link";
import Image from "next/image";

import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      {/* @@@ Use fill to cover the entire parent if you don't prefer height and width to be specified. */}
      {/* @@@ Placeholder-blur will placehold a blur before the image has been loaded. */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
