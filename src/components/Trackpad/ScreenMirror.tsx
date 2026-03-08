"use client"

import type React from "react"
import { useRef } from "react"
import { useConnection } from "../../contexts/ConnectionProvider"
import { useMirrorStream } from "../../hooks/useMirrorStream"

interface ScreenMirrorProps {
	scrollMode: boolean
	isTracking: boolean
	handlers: React.HTMLAttributes<HTMLDivElement>
	enabled: boolean
}

const TEXTS = {
	WAITING: "Waiting for screen...",
	AUTOMATIC: "Mirroring will start automatically",
	DISABLED: "Screen Mirroring Disabled",
	ENABLE_PROMPT: "Enable in control bar to view screen",
}

export const ScreenMirror = ({
	scrollMode,
	isTracking,
	handlers,
	enabled,
}: ScreenMirrorProps) => {
	const { wsRef, status } = useConnection()
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { hasFrame } = useMirrorStream(wsRef, canvasRef, status, enabled)

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden select-none touch-none">
			{/* Mirror Canvas */}
			<canvas
				ref={canvasRef}
				className={`w-full h-full object-contain transition-opacity duration-500 ${
					hasFrame && enabled ? "opacity-100" : "opacity-0"
				}`}
			/>

			{/* Standby UI */}
			{(!hasFrame || !enabled) && (
				<div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-4">
					{enabled ? (
						<>
							<div className="loading loading-spinner loading-lg text-primary" />
							<div className="text-center px-6">
								<p className="font-semibold text-lg">{TEXTS.WAITING}</p>
								<p className="text-sm opacity-60">{TEXTS.AUTOMATIC}</p>
							</div>
						</>
					) : (
						<div className="text-center px-6">
							<p className="font-semibold text-lg">{TEXTS.DISABLED}</p>
							<p className="text-sm opacity-60">{TEXTS.ENABLE_PROMPT}</p>
						</div>
					)}
				</div>
			)}

			{/* Transparent Gesture Overlay */}
			<div
				className="absolute inset-0 z-10"
				{...handlers}
				style={{
					cursor: scrollMode ? "ns-resize" : isTracking ? "none" : "default",
				}}
			/>
		</div>
	)
}
