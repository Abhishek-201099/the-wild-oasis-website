import Image from "next/image";
import Link from "next/link";

import image from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={image}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
      />

      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
