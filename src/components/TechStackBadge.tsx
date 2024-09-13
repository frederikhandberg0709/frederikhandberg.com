export default function TechStackBadge({
  name,
  description,
  logo: Logo,
}: {
  name: string;
  description: string;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#339DFF] to-[#312FAD] opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"></div>
      <div className="relative z-10 m-0.5 flex h-24 w-60 items-center justify-start rounded-xl bg-[#0a0a0a] p-3 transition duration-200 ease-in-out group-hover:bg-neutral-900">
        <div className="flex items-center gap-2.5">
          <Logo height={50} width={50} className="min-w-fit" />
          <div className="flex flex-col gap-0.5">
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
