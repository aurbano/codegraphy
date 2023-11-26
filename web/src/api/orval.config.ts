import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://127.0.0.1:8000/openapi.json',
      // validation: true,
    },
    output: {
      baseUrl: 'http://127.0.0.1:8000',
      target: './index.ts',
      schemas: 'schema',
      client: 'react-query',
      mode: 'split',
      clean: ['!orval.config.ts'],
      mock: true,
      prettier: true,
    },
  },
});
