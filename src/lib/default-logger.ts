import { createLogger } from '@/lib/logger';
import { appConfig } from '@/config/index';

export const logger = createLogger({ level: appConfig.logLevel });
