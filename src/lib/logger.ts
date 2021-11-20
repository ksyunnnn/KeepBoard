/* eslint-disable no-console */
const logger = (status: 'SUCCES' | 'ERROR', ...msg: unknown[]) => {
  if (process.env.NEXT_PUBLIC_ENV !== 'LOCAL') return;
  console.log(`Logger::${status}:`, ...msg);
};

export default logger;
