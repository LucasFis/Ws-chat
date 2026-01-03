let navigateFn = null;

export const setNavigator = (navigate) => {
    navigateFn = navigate;
};

export const navigateToError = (code, title, message) => {
    if (navigateFn) {
        navigateFn("/error", {
            state: { code, title, message },
            replace: true
        });
    }
};
