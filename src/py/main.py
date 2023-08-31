class Plugin:
    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        # startup
        pass

    async def _unload(self):
        # shutdown
        pass
