import { nigeriaLocations } from '@/assets/data'
import type { JobFilters } from '@/types/job'

interface FilterModalProps {
  open: boolean
  onClose: () => void
  filters: JobFilters
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>
  services: string[]
}

export default function FilterModal({
  open,
  onClose,
  filters,
  setFilters,
  services,
}: FilterModalProps) {
  if (!open) return null

  const stateNames = Object.keys(nigeriaLocations)

  const selectedStateCities = filters.state
    ? nigeriaLocations[filters.state] || []
    : []

  const handleChange = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'state' && { city: '' }),
    }))
  }

  const handleReset = () => {
    setFilters({
      serviceType: '',
      minAmount: '',
      maxAmount: '',
      state: '',
      city: '',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="font-semibold text-lg">Filter Jobs</h2>

        <select
          value={filters.serviceType}
          onChange={(e) => handleChange('serviceType', e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Service Type</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <input
          placeholder="Min Amount"
          type="number"
          value={filters.minAmount}
          onChange={(e) => handleChange('minAmount', e.target.value)}
          className="w-full border rounded p-2"
        />

        <input
          placeholder="Max Amount"
          type="number"
          value={filters.maxAmount}
          onChange={(e) => handleChange('maxAmount', e.target.value)}
          className="w-full border rounded p-2"
        />

        <select
          value={filters.state}
          onChange={(e) => handleChange('state', e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">State</option>
          {stateNames.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
          disabled={selectedStateCities.length === 0}
          className="w-full border rounded p-2 disabled:bg-gray-100"
        >
          <option value="">City / LGA</option>
          {selectedStateCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300 cursor-pointer transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
