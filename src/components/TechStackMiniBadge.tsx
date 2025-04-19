export default function TechStackMiniBadge({ name }: { name: string }) {
  return (
    <div className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-center text-sm font-semibold text-black/75 dark:bg-gray-800 dark:text-white/75">
      {name}
    </div>
  );
}
