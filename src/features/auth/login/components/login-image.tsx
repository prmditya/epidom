import Image from "next/image";

export function LoginImage() {
  return (
    <div className="relative hidden md:block">
      <Image
        alt="Bakery illustration"
        src="/images/matierepremiere.png"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
