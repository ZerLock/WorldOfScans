const utils = {
    isDevelopmentMode: (): boolean => {
        return process.env.NODE_ENV === 'development';
    },
};

export default utils;
