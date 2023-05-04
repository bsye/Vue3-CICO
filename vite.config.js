import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(pathSegments, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        exclude: ['**/node_modules/**'],
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
            lines: 100,
            functions: 100,
            branches: 100,
            statements: 100,
        }
    }
})