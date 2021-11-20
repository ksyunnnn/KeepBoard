/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';

declare module 'react' {
  type FCX<P = {}> = React.FunctionComponent<P & { className?: string }>
}
