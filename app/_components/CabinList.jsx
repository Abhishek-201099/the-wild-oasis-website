import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  const displayedCabins =
    filter === "large"
      ? cabins.filter((cabin) => cabin.maxCapacity >= 8)
      : filter === "medium"
      ? cabins.filter(
          (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        )
      : filter === "small"
      ? cabins.filter((cabin) => cabin.maxCapacity <= 3)
      : filter === "all"
      ? cabins
      : [];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
