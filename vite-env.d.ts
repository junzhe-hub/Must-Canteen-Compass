
// /// <reference types="vite/client" />

// Explicitly declare process to fix "Cannot find name 'process'" TS error
// when using process.env.API_KEY in client-side code without @types/node.
declare const process: {
  env: {
    API_KEY: string;
    [key: string]: any;
  }
};
