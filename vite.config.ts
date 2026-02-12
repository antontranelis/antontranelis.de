import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// GitHub Pages SPA: 404.html = index.html → React Router übernimmt
function ghPages404(): Plugin {
  return {
    name: 'gh-pages-404',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      mdxExtensions: ['.mdx'],
      // Explizit nur .mdx verarbeiten
      include: /\.mdx$/,
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }),
    react(),
    tailwindcss(),
    ghPages404(),
  ],
})
