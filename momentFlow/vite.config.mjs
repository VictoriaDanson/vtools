import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// GitHub Pages 下需要设置 base 为仓库名路径
const repoName = 'vtools'; // 如仓库名不同，这里同步修改

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: `/${repoName}/`,
});
