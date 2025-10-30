export interface IAppSettings {
    appInfo: {
        id: number;
        name: string;
        title: string;
        storage: string;
    },
    dateTime: {
        format: 'MDY' | 'DMY'
    },
    navigation: {
        static: boolean
    }
}