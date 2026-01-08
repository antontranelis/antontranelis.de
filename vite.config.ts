import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

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
  ],
})
