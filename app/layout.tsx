import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'V3 Call Tracker Dave',
  description: 'Call recording and transcription dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-semibold text-gray-900">V3 Call Tracker</h1>
                <nav className="flex space-x-8">
                  <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                  <a href="/recordings" className="text-gray-600 hover:text-gray-900">Recordings</a>
                  <a href="/transcriptions" className="text-gray-600 hover:text-gray-900">Transcriptions</a>
                  <a href="/calendar" className="text-gray-600 hover:text-gray-900">Calendar</a>
                  <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}