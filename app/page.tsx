import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center mt-50">
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <Link
          className="flex  h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          href="/photo-feed"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          Here My Homework
        </Link>
      </div>
    </div>
  );
}
