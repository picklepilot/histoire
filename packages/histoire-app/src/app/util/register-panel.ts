export async function registerPanel(id: string | number, slug: string, title: string, component: any) {
  console.log('[histoire] registerPanel', { id, slug, title, component })
  const { usePanelsStore } = await import('../stores/panels.js')
  usePanelsStore().addPanel({ id, slug, title, component })
}
