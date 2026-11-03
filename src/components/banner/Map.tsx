import Image from "next/image";

export default function Map() {
  return (
    <div className="relative w-full max-w-[450px] aspect-[3/4] h-auto lg:w-112.5 lg:h-150 lg:aspect-auto shrink-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "url('/bd-map.svg')",
          WebkitMaskImage: "url('/bd-map.svg')",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1780282148151-e53f763cbb30?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          alt="Bangladesh Map Banner"
          fill
          priority
          className="object-cover w-full h-full scale-x-[-1]"
          sizes="(max-width: 1023px) min(450px, 100vw), 450px"
        />
      </div>
    </div>
  );
}
