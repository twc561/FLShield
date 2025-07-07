export function ContextualPanel() {
  return (
    <aside className="hidden xl:block w-80 shrink-0 border-l p-6 bg-sidebar/50">
      <div className="sticky top-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Contextual Information
        </h2>
        <p className="text-sm text-muted-foreground">
          This panel will display context-specific information, metadata, or
          quick notes related to the content in the main view.
        </p>
        <div className="mt-6 space-y-4">
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold text-sm mb-1">Quick Tip</h3>
                <p className="text-xs text-muted-foreground">Use <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl+B</kbd> to toggle the sidebar.</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold text-sm mb-1">Last Sync</h3>
                <p className="text-xs text-muted-foreground">Data synced just now.</p>
            </div>
        </div>
      </div>
    </aside>
  )
}
