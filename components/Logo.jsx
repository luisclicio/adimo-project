export function Logo({ height }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/gca-logo.svg"
      alt="Grupo Cultural Adimó"
      loading="lazy"
      style={{
        height,
      }}
    />
  );
}
