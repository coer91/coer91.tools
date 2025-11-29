export interface IAppSettings {
    appInfo: {
        id: number;
        project: string;
        title: string;
        storage: string;
        version: string;
    },
    environment: {
        info: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
        isDevelopment: boolean;
        isStaging: boolean;
        isProduction: boolean;
    }, 
    dateTime: {
        format: 'MDY' | 'DMY';
    },
    navigation: {
        static: boolean;
        useHash: boolean;
    }
}