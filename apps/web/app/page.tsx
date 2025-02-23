import Image from "next/image";

export default function Page() {
  return <div className="h-screen w-screen flex-col p-4">
    <div className="flex flex-col">
      <Image src="/ripple_logo.png" alt="absd" width={100} height={100} />
      <p className="pl-1 text-gray-400">Ripple Inc.</p>
    </div>
  </div>
}