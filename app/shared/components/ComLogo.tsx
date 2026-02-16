import { getBrandInfo } from "@/lib/social";
import Image from "next/image";
import Link from "next/link";

export const ComLogo =async () => {

   const brandInfoRaw = await getBrandInfo();

  return (
    <Link href="/">
      <div className="hover:cursor-pointer">
        <Image
          src={brandInfoRaw?.data?.logo || "/placeholder.svg"}
          alt={brandInfoRaw?.data?.name || "Crab fashion"}
          width={79}
          height={66}
        />
      </div>
    </Link>
  );
};
