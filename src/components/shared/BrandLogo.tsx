const LOGO_URL = "https://www.gsgroups.net/gslogo.png";

export default function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={LOGO_URL}
        alt="GS Logo"
        className="rounded-xl object-contain"
        style={{ width: size, height: size }}
      />
      <span className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground">
        GSQODER<span className="text-primary">.AI</span>
      </span>
    </div>
  );
}
