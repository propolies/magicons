export declare function magicons(): {
    name: string;
    markup: ({ content, filename }: {
        content: string;
        filename: string;
    }) => {
        code: string;
        map: import("magic-string").SourceMap;
    } | undefined;
};
