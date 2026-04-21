"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
	const coreRef = useRef<HTMLDivElement>(null);
	const bloomRef = useRef<HTMLDivElement>(null);
	const posRef = useRef({ x: -100, y: -100 });
	const rafRef = useRef<number>(0);

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			posRef.current = { x: e.clientX, y: e.clientY };
		};

		const loop = () => {
			const { x, y } = posRef.current;
			if (coreRef.current) {
				coreRef.current.style.transform = `translate(${x}px, ${y}px)`;
			}
			if (bloomRef.current) {
				bloomRef.current.style.transform = `translate(${x}px, ${y}px)`;
			}
			rafRef.current = requestAnimationFrame(loop);
		};

		window.addEventListener("mousemove", onMove);
		rafRef.current = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener("mousemove", onMove);
			cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<>
			{/* Soft bloom layer — large, blurred, behind everything */}
			<div
				ref={bloomRef}
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-[9998] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
				style={{
					background:
						"radial-gradient(circle, rgba(255,122,24,0.28) 0%, rgba(255,106,0,0.16) 35%, rgba(255,80,0,0.06) 65%, transparent 100%)",
					filter: "blur(12px)",
				}}
			/>

			{/* Core cursor dot — sharp, sits on top */}
			<div
				ref={coreRef}
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
				style={{
					background: "rgba(255,122,31,0.92)",
					boxShadow:
						"0 0 0 1px rgba(255,154,60,0.30), 0 0 10px rgba(255,122,24,0.32), 0 0 22px rgba(255,106,0,0.20), 0 0 40px rgba(255,80,0,0.10)",
				}}
			/>
		</>
	);
}
