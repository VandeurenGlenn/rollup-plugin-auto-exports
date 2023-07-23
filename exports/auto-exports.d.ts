declare type AutoExportOptions = {
    defaultExports?: Object;
    exportsDir?: String;
};
declare const autoExports: (options?: AutoExportOptions) => {
    name: string;
    writeBundle: (bundleOptions: any) => Promise<void>;
};
export { autoExports };
export default autoExports;
