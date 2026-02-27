import {
	HeadContent,
	Link,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router"
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { APP_CONFIG, THEMES } from "../config"
import { useTheme } from "../hooks/useTheme"
import "../styles.css"

export const Route = createRootRoute({
	component: RootComponent,
	errorComponent: (props) => {
		return (
			<RootDocument>
				<div>Error: {props.error.message}</div>
			</RootDocument>
		)
	},
	notFoundComponent: () => <div>Not Found</div>,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			{/* <TanStackRouterDevtools position="bottom-right" /> */}
		</RootDocument>
	)
}

function ThemeInit() {
	useTheme() // Hook handles initialization and storage sync
	return null
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, interactive-widget=resizes-content"
				/>
				<title>Rein Remote</title>
				<link rel="icon" type="image/svg+xml" href="/app_icon/Icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className="bg-base-200 text-base-content overflow-hidden overscroll-none">
				<ThemeInit />
				<div className="flex flex-col h-[100dvh]">
					<Navbar />
					<main className="flex-1 overflow-hidden relative">{children}</main>
				</div>
				<Scripts />
			</body>
		</html>
	)
}

function Navbar() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className="navbar bg-base-100 border-b border-base-300 min-h-12 h-12 z-50 px-4">
			<div className="flex-1">
				<Link to="/trackpad" className="btn btn-ghost text-xl normal-case px-2">
					<img
						src="/app_icon/IconLine.png"
						height={28}
						width={28}
						alt="Rein logo"
						className={theme === THEMES.LIGHT ? "invert" : ""}
					/>
					<span className="ml-2 hidden sm:inline">Rein</span>
				</Link>
			</div>
			<div className="flex-none flex items-center gap-1 sm:gap-2">
				<Link
					to="/trackpad"
					className="btn btn-ghost btn-sm px-2 sm:px-4"
					activeProps={{ className: "btn-active bg-base-200" }}
				>
					Trackpad
				</Link>
				<Link
					to="/settings"
					className="btn btn-ghost btn-sm px-2 sm:px-4"
					activeProps={{ className: "btn-active bg-base-200" }}
				>
					Settings
				</Link>
				<div className="divider divider-horizontal mx-0 sm:mx-1" />
				<button
					type="button"
					onClick={toggleTheme}
					className="btn btn-ghost btn-sm btn-circle"
					aria-label="Toggle theme"
				>
					{theme === THEMES.LIGHT ? (
						<Moon size={18} className="text-primary" />
					) : (
						<Sun size={18} className="text-yellow-400" />
					)}
				</button>
			</div>
		</div>
	)
}
