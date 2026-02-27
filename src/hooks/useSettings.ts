import { useEffect, useState } from "react"

export function useSettings() {
	const [invertScroll, setInvertScrollState] = useState(() => {
		if (typeof window === "undefined") return false
		try {
			const saved = localStorage.getItem("rein_invert")
			return saved === "true"
		} catch {
			return false
		}
	})

	const [sensitivity, setSensitivityState] = useState(() => {
		if (typeof window === "undefined") return 1.0
		try {
			const saved = localStorage.getItem("rein_sensitivity")
			const parsed = saved ? Number.parseFloat(saved) : 1.0
			return Number.isFinite(parsed) ? parsed : 1.0
		} catch {
			return 1.0
		}
	})

	const setInvertScroll = (value: boolean) => {
		setInvertScrollState(value)
		localStorage.setItem("rein_invert", JSON.stringify(value))
	}

	const setSensitivity = (value: number) => {
		setSensitivityState(value)
		localStorage.setItem("rein_sensitivity", String(value))
	}

	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key === "rein_invert") {
				setInvertScrollState(e.newValue === "true")
			}
			if (e.key === "rein_sensitivity") {
				const parsed = e.newValue ? Number.parseFloat(e.newValue) : 1.0
				if (Number.isFinite(parsed)) setSensitivityState(parsed)
			}
		}

		window.addEventListener("storage", handleStorage)
		return () => window.removeEventListener("storage", handleStorage)
	}, [])

	return { invertScroll, sensitivity, setInvertScroll, setSensitivity }
}
