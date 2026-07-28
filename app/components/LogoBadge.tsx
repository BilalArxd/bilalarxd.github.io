function initials(name: string) {
  return name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function LogoBadge({
  name,
  logo,
  onDark,
  size = "h-10 w-10",
}: {
  name: string;
  logo: string | null;
  onDark?: boolean;
  size?: string;
}) {
  if (!logo) {
    return (
      <div
        className={`flex ${size} shrink-0 items-center justify-center rounded-lg bg-neutral-100 font-mono text-xs font-semibold text-neutral-500 dark:bg-white/5 dark:text-neutral-400`}
        title={name}
        aria-label={name}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-lg border p-1 ${
        onDark
          ? "border-neutral-800 bg-neutral-900"
          : "border-neutral-200 bg-white dark:border-white/10"
      }`}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, logos are fixed local assets */}
      <img src={logo} alt={name} className="h-full w-full object-contain" />
    </div>
  );
}
