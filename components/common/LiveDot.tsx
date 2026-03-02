export function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
    </span>
  )
}
