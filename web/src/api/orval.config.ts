import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://127.0.0.1:8000/openapi.json',
      // validation: true,
    },
    output: {
      target: './index.ts',
      schemas: 'schema',
      client: 'react-query',
      mode: 'split',
      clean: ['!orval.config.ts'],
      mock: true,
      prettier: true,
    },
    // hooks: {
    //   afterAllFilesWrite: 'yarn run prettier --write',
    // },
  },
});
