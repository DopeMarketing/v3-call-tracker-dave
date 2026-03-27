export default function Calendar() {
  // TODO: Fetch calendar_events from Google Calendar integration
  // TODO: Fetch call_recordings and match with calendar events
  // TODO: Display sync status and last sync time
  // TODO: Handle manual event-recording matching

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar Integration</h2>
          <p className="text-gray-600">Sync meetings with call recordings</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Sync Calendar
        </button>
      </div>

      {/* Sync Status */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Sync Status</h3>
            <p className="text-sm text-gray-600">Last synced: Never</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Not Connected</span>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500">No upcoming events</p>
              <p className="text-sm text-gray-400 mt-1">Connect your calendar to see events</p>
            </div>
          </div>
        </div>

        {/* Unmatched Recordings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Unmatched Recordings</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500">No unmatched recordings</p>
              <p className="text-sm text-gray-400 mt-1">All recordings are matched with calendar events</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Recent Matches</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No recent matches</p>
          </div>
        </div>
      </div>
    </div>
  )
}