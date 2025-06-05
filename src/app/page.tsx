import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl mt-10">Welcome to your Next.js app!</h1>
      </main>
    </div>
  );
}
