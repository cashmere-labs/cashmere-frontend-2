import svgx from '@svgx/vite-plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
    return {
        plugins: [
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
