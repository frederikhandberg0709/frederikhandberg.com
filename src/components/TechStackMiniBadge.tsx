export default function TechStackMiniBadge({ name }: { name: string }) {
  return (
    <div className="whitespace-nowrap rounded-full bg-black/10 px-2.5 py-1 text-center text-sm font-semibold text-black/75 dark:bg-white/10 dark:text-white/75">
      {name}
    </div>
  );
}
