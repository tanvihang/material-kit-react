import { LogLevel } from "@/lib/logger";

export type Config = {
    site: {
        name: string;
        description: string;
    },
    logLevel: keyof typeof LogLevel;
}

export const appConfig: Config = {
    site: {
        name: "Signsbeat Dashboard",
        description: "Signsbeat V3 Dashboard",
    },
    logLevel: (process.env.LOG_LEVEL as keyof typeof LogLevel) || LogLevel.ALL,
}