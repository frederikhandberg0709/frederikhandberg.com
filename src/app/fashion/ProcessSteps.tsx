interface ProcessStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export default function ProcessStep({
  number,
  title,
  children,
}: ProcessStepProps) {
  return (
    <div className="flex gap-2.5">
      <div>
        <div className="flex size-6 items-center justify-center rounded-full bg-gray-600">
          <p className="text-sm font-bold text-white">{number}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm leading-relaxed text-stone-700">{children}</p>
      </div>
    </div>
  );
}
