import { Suspense } from "react";

import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Loading from "./loading";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
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

      {/* Wrapping CabinList in Suspense because it's concerned with loading of cabins.
          The whole component of Page don't need to be replaced with Spinner, only the CabinList.
          For such granular control over loading we wrap the data fetching concerned component in suspense. */}

      <Suspense fallback={<Loading />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
