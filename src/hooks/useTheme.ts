import { useEffect, useState } from "react"
import { APP_CONFIG, THEMES } from "../config"

export function useTheme() {
	const [theme, setThemeState] = useState(() => {
		if (typeof window === "undefined") return THEMES.DEFAULT
		try {
			const saved = localStorage.getItem(APP_CONFIG.THEME_STORAGE_KEY)
			return saved === THEMES.LIGHT || saved === THEMES.DARK
				? saved
				: THEMES.DEFAULT
		} catch {
			return THEMES.DEFAULT
		}
	})

	const setTheme = (newTheme: string) => {
		if (newTheme !== THEMES.LIGHT && newTheme !== THEMES.DARK) return
		setThemeState(newTheme)
		if (typeof window !== "undefined") {
			localStorage.setItem(APP_CONFIG.THEME_STORAGE_KEY, newTheme)
			document.documentElement.setAttribute("data-theme", newTheme)
		}
	}

	const toggleTheme = () => {
		const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
		setTheme(newTheme)
	}

	// Initialize theme on mount and watch for external changes (from other tabs/components)
	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key === APP_CONFIG.THEME_STORAGE_KEY && e.newValue) {
				if (e.newValue === THEMES.LIGHT || e.newValue === THEMES.DARK) {
					setThemeState(e.newValue)
					document.documentElement.setAttribute("data-theme", e.newValue)
				}
			}
		}

		// Initial sync
		document.documentElement.setAttribute("data-theme", theme)

		window.addEventListener("storage", handleStorage)
		return () => window.removeEventListener("storage", handleStorage)
	}, [theme])

	return { theme, setTheme, toggleTheme }
}
