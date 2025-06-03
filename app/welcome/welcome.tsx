export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-6xl font-bold text-center text-gray-900 dark:text-gray-100">
              🚗 Car Tracker
            </h1>
            <p className="text-xl text-center text-gray-600 dark:text-gray-400 mt-4">
              SMOC Oil Change Outreach Event
            </p>
          </div>
        </header>
        <div className="max-w-[400px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Track cars through the oil change process for our church outreach ministry event.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">System Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">React Router 7:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ Initialized</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Default Routing:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ Working</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Build System:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ Ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">TypeScript:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ Configured</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Next Steps</h3>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Set up Tailwind CSS v4</li>
                  <li>• Configure ESLint & Prettier</li>
                  <li>• Set up Wrangler for Cloudflare</li>
                  <li>• Add Playwright E2E testing</li>
                  <li>• Configure CI/CD pipeline</li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
