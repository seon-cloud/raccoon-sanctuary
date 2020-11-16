const getExtandedActions = (options, defaultActions = {}) => {
    return options?.actions 
        ? { ...options.actions, ...defaultActions }
        : defaultActions;
};

const getExtendedPackages = (options, defaultPackages = {}) => {
    return options?.packages
        ? { ...options.packages, ...defaultPackages }
        : defaultPackages;
};

export default { getExtendedPackages, getExtandedActions };