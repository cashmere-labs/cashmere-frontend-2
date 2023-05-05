import svgx from '@svgx/vite-plugin-react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
    return {
        plugins: [
            react(),
            svgx({ defaultImport: 'url' }),
            // chunkSplitPlugin({
            //     strategy: 'single-vendor',
            //     customChunk: args => {
            //         const { file } = args;
            //         const chunks = ['VeCSM', 'DAO', 'Swap'];
            //         for (const chunk of chunks) {
            //             if (file.startsWith(`src/pages/${chunk}`) || file.startsWith(`src/components/${chunk}`)) {
            //                 return chunk;
            //             }
            //         }
            //         return null;
            //     },
            //     customSplitting: {
            //         'react': [
            //             'react',
            //             'react-dom',
            //             'react-cool-dimensions',
            //             'react-modern-calendar-datepicker',
            //             'react-responsive',
            //             'react-router-dom',
            //             'react-slider',
            //             'react-toastify'
            //         ],
            //         'ethereum': ['ethers', 'wagmi', '@wagmi/core', '@rainbow-me/rainbowkit'],
            //         'state': ['mobx', 'mobx-react-lite', 'inversify', 'inversify-react'],
            //     }
            // })
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        es: [ 'ethers' ],
                    }
                }
            }
        },
    };
});
