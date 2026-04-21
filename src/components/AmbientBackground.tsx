export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,4,2,0.98)_0%,rgba(15,8,4,0.95)_100%)]" />
      <div className="absolute right-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(255,122,24,0.2)] blur-[90px]" />
      <div className="absolute bottom-[-11rem] left-[-9rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(255,106,0,0.16)] blur-[80px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
