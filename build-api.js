import { build } from 'esbuild';

build({
    entryPoints: ['api/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    format: 'esm',
    outfile: 'api/index.js',
    external: [
        '@libsql/client',
        'drizzle-orm',
        'express',
        'serverless-http',
        'cookie-session'
    ],
    banner: {
        js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);'
    }
}).then(() => {
    console.log('✅ API handler bundled successfully');
}).catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
