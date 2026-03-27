export default function Transcriptions() {
  // TODO: Fetch all transcriptions with associated call_recordings
  // TODO: Implement full-text search across transcription content
  // TODO: Filter transcriptions by tags and date range
  // TODO: Handle bulk transcription operations

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transcriptions</h2>
        <p className="text-gray-600">Search and manage call transcriptions</p>
      </div>

      {/* Search Interface */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search within transcriptions..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
            />
            <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Status</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Failed</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Languages</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <input type="checkbox" className="rounded" />
          <span className="text-sm text-gray-600">Select all</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Re-transcribe</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Export</button>
          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
        </div>
      </div>

      {/* Transcriptions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No transcriptions found</p>
              <p className="text-gray-400 text-sm mt-2">Upload recordings to generate transcriptions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}