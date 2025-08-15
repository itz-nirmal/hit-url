'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

interface URL {
  id: string
  url: string
  name: string | null
  description: string | null
  interval_minutes: number
  is_active: boolean
  created_at: string
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [urls, setUrls] = useState<URL[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUrl, setNewUrl] = useState({
    url: '',
    name: '',
    description: '',
    interval_minutes: 5
  })

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls')
      if (response.ok) {
        const data = await response.json()
        setUrls(data.urls || [])
      }
    } catch (error) {
      console.error('Error fetching URLs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUrl),
      })

      if (response.ok) {
        setNewUrl({ url: '', name: '', description: '', interval_minutes: 5 })
        setShowAddForm(false)
        fetchUrls()
      }
    } catch (error) {
      console.error('Error adding URL:', error)
    }
  }

  const handleCheckUrl = async (urlId: string) => {
    try {
      const response = await fetch(`/api/urls/${urlId}/check`, {
        method: 'POST',
      })
      
      if (response.ok) {
        // Refresh the URL list or show success message
        console.log('URL checked successfully')
      }
    } catch (error) {
      console.error('Error checking URL:', error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)]">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">HIT URL Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white/70">Welcome, {user?.email}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-medium text-white mb-2">Total URLs</h3>
              <p className="text-3xl font-bold text-[rgb(0,251,205)]">{urls.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-medium text-white mb-2">Active URLs</h3>
              <p className="text-3xl font-bold text-green-400">{urls.filter(url => url.is_active).length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-medium text-white mb-2">Average Interval</h3>
              <p className="text-3xl font-bold text-blue-400">
                {urls.length > 0 
                  ? Math.round(urls.reduce((sum, url) => sum + url.interval_minutes, 0) / urls.length)
                  : 0
                } min
              </p>
            </div>
          </div>

          {/* URLs Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Your URLs</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[rgb(0,251,205)] text-black px-4 py-2 rounded-lg font-medium hover:bg-[rgb(0,251,205)]/90 transition-colors"
                >
                  Add New URL
                </button>
              </div>
            </div>

            {/* Add URL Form */}
            {showAddForm && (
              <div className="p-6 border-b border-white/10 bg-white/5">
                <form onSubmit={handleAddUrl} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        URL *
                      </label>
                      <input
                        type="url"
                        value={newUrl.url}
                        onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)]"
                        placeholder="https://example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newUrl.name}
                        onChange={(e) => setNewUrl({ ...newUrl, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)]"
                        placeholder="My Website"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Description
                    </label>
                    <textarea
                      value={newUrl.description}
                      onChange={(e) => setNewUrl({ ...newUrl, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)]"
                      placeholder="Optional description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Check Interval (minutes)
                    </label>
                    <select
                      value={newUrl.interval_minutes}
                      onChange={(e) => setNewUrl({ ...newUrl, interval_minutes: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)]"
                    >
                      <option value={1}>1 minute</option>
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-[rgb(0,251,205)] text-black px-4 py-2 rounded-lg font-medium hover:bg-[rgb(0,251,205)]/90 transition-colors"
                    >
                      Add URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-500/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-500/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* URLs List */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(0,251,205)] mx-auto mb-4"></div>
                  <p className="text-white/70">Loading URLs...</p>
                </div>
              ) : urls.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 mb-4">No URLs added yet</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="text-[rgb(0,251,205)] hover:underline"
                  >
                    Add your first URL
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {urls.map((url) => (
                    <div
                      key={url.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white">
                            {url.name || 'Unnamed URL'}
                          </h3>
                          <p className="text-[rgb(0,251,205)] text-sm mb-2">{url.url}</p>
                          {url.description && (
                            <p className="text-white/70 text-sm mb-2">{url.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>Check every {url.interval_minutes} min</span>
                            <span>Added {new Date(url.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCheckUrl(url.id)}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Check Now
                          </button>
                          <button className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 px-3 py-1 rounded text-sm transition-colors">
                            Stats
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}