import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // ← これも忘れずに
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],

    server: {
        host: true,
        port: 5173,
    },

    build: {
        manifest: true,
        outDir: 'public/build', // Laravelが読み込む場所
        emptyOutDir: true,
        rollupOptions: {
            input: 'resources/js/app.js',
        },
    },
});
