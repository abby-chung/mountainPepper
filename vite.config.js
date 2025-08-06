import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mountainPepper/', // 專案名稱需與 GitHub Repo 相符
  plugins: [react()]
});
