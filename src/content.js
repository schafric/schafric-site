// Auto-imports all markdown files from content/ directories
// Files starting with _ (like _template.md) are excluded

const dropModules = import.meta.glob('/content/drops/*.md', { eager: true })
const resourceModules = import.meta.glob('/content/resources/*.md', { eager: true })

function loadContent(modules) {
  return Object.entries(modules)
    .filter(([path]) => !path.includes('/_'))
    .map(([, mod]) => mod.default)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const DROPS = loadContent(dropModules)
export const RESOURCES = loadContent(resourceModules)

export function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
