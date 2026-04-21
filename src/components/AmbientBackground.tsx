export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(255,122,24,0.35)_0%,rgba(20,6,0,0.08)_46%,rgba(8,4,2,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.76)_44%,rgba(92,33,0,0.32)_100%)]" />
      <div className="absolute left-1/2 top-[-24rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-orange-500/25 blur-[140px]" />
      <div className="absolute bottom-[-18rem] right-[-8rem] h-[36rem] w-[36rem] rounded-full bg-orange-400/20 blur-[120px]" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:74px_74px] opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
