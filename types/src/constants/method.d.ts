export declare const METHOD: {
    PACKAGE_INSTALL: {
        npm: string[];
        yarn: never[];
        pnpm: string[];
        bun: string[];
    };
    FRAMEWORK: {
        REACT: {
            npm: string[];
            yarn: string[];
            pnpm: string[];
            TEMPLATE: string;
        };
    };
    GIT: string;
    GIT_INIT: string[];
    GIT_ADD_REMOTE: string[];
    GIT_ADD_CHANGES: string[];
    GIT_COMMIT_COMMAND: string[];
    GIT_PUSH: string[];
    GIT_REVERT: string[];
    GIT_RESET_HEAD: string[];
    GIT_RESET: string[];
    REMOVE: string;
    REMOVE_ALL_OPTION: string[];
    NODE_MODULES: string;
    LOCK: {
        npm: string;
        pnpm: string;
    };
};
