import { Suspense } from "react";

import CabinList from "@/app/_components/CabinList";
import Loading from "./loading";
import Filter from "../_components/Filter";

// As this component is now dynamically rendered so we can no longer use revalidate here as it is not static.
// export const revalidate=0;

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  // Search params are available to page.jsx
  // As searchParams are only known at runtime this component is now dynamic and not static
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      {/* This part is not concerned with data fetching so need not show loading spinner.
          And so the data fetching logic is separated into another file and then wrapped with suspense */}
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos; beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Wrapping CabinList in Suspense because it's concerned with loading of cabins.
          The whole component of Page don't need to be replaced with Spinner, only the CabinList.
          For such granular control over loading we wrap the data fetching concerned component in suspense. */}

      {/* Unfortunately, for navigation i.e transition suspense won't show fallback, so we need to use key prop */}

      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
