'use client';

import { useEffect, useState } from 'react';

interface Earthquake {
  _id: string;
  eventId: string;
  location: {
    coordinates: [number, number];
  };
  magnitude: {
    value: number;
  };
  detectedAt: string;
}

export default function Dashboard() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/earthquakes?limit=4');
      const data = await response.json();
      setEarthquakes(data.data || []);
      setTotalCount(data.total || 0);
      
      if (data.data && data.data.length > 0) {
        const latestTime = new Date(data.data[0].detectedAt);
        setLastUpdate(latestTime.toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching earthquakes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationString = (coords: [number, number]) => {
    return `${coords[1].toFixed(2)}°, ${coords[0].toFixed(2)}°`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Earthquake Monitoring System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Earthquakes Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Earthquakes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalCount}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Latest Update Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Latest Update</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{lastUpdate}</p>
              <p className="text-xs text-gray-500 mt-1">Server time (UTC)</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* System Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">System Status</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Running
                </span>
              </div>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading earthquake data...</p>
        ) : earthquakes.length > 0 ? (
          <div className="space-y-3">
            {earthquakes.map((quake) => (
              <div
                key={quake._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Location: {getLocationString(quake.location.coordinates)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(quake.detectedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-100">
                    <span className="text-sm font-bold text-red-700">
                      {quake.magnitude.value.toFixed(1)} M
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No earthquake data available</p>
        )}
      </div>
    </div>
  );
}