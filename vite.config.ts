import svgx from '@svgx/vite-plugin-react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
    return {
        plugins: [
            react(),
            svgx({ defaultImport: 'url' }),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        es: [ 'ethers' ],
                    }
                }
            }
        }
    };
});
