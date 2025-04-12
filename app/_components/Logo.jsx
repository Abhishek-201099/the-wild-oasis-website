import Image from "next/image";
import Link from "next/link";

import image from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* Two ways to use Image from next/image */}
      {/* @@@ Specifying the direct path will optimize at runtime. */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* @@@ Directly serving the image to src will optimize it at build time. */}
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
