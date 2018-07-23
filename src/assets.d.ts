/**
 * The bumndlers (webpack or parcel, etc) work best for static assest if they are imported 
 * in the TypeScript code. If done so, the bundlers will also include those imported static 
 * assets in the build - hence the build will be complete.
 * 
 * However, importing these assets in TypScript causes VSCode to report TS errors. The following
 * declarations render the imports as valid.
 * 
 * Based on post: https://github.com/Microsoft/TypeScript/issues/6615
 */
declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.ttf" {
    const value: any;
    export default value;
}
