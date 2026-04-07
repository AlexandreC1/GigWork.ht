import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const geminiKey = env.GEMINI_API_KEY || '';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        // Proxy AI requests through the dev server so the API key stays
        // server-side and is never bundled into the client.
        '/api/gemini': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: (p: string) => {
            const stripped = p.replace(/^\/api\/gemini/, '');
            const sep = stripped.includes('?') ? '&' : '?';
            return `${stripped}${sep}key=${encodeURIComponent(geminiKey)}`;
          },
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './test/setup.ts',
    },
  };
});
