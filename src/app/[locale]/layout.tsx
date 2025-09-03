import * as React from "react";
import type { Viewport } from "next";

import "@/styles/global.css";

import { NextIntlClientProvider } from "next-intl";

import { UserProvider } from "@/contexts/user-context";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";

export const viewport = { width: "device-width", initialScale: 1 } satisfies Viewport;

interface LayoutProps {
	children: React.ReactNode;
}

export default function LocaleLayout({ children }: LayoutProps): React.JSX.Element {
	return (
		<html lang="en">
			<body>
				<LocalizationProvider>
					<NextIntlClientProvider>
						<UserProvider>
							<ThemeProvider>{children}</ThemeProvider>
						</UserProvider>
					</NextIntlClientProvider>
				</LocalizationProvider>
			</body>
		</html>
	);
}
