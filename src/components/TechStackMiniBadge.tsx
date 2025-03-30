export default function TechStackMiniBadge({ name }: { name: string }) {
  return (
    <div className="whitespace-nowrap rounded-full bg-black/10 px-2.5 py-1 text-center text-sm font-semibold text-black/75 dark:bg-slate-800">
      {name}
    </div>
  );
}
