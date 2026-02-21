import matter from 'gray-matter'

export default function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return null

      const { data, content } = matter(code)

      const result = {
        ...data,
        content: content.trim(),
      }

      return {
        code: `export default ${JSON.stringify(result)}`,
        map: null,
      }
    },
  }
}
