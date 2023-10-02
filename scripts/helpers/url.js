export const paramsUrl = (url) => {
    const chunkUrl = url.split('?');
    const params = new URLSearchParams(chunkUrl[1]);

    return params;
}