const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

export default sleep;
