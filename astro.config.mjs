import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jinlincattery.com',
  // 构建输出到 dist 目录（Cloudflare Pages 部署用）
  output: 'static',
});
