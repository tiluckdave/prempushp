"use client"

import { useState } from "react"

const categories = ["Spices", "Pulses", "Rice", "Oils", "Dry Fruits", "Organic Vegetables"]
const priceRanges = ["Under ₹100", "₹100 - ₹250", "₹250 - ₹500", "Over ₹500"]
const dietaryPreferences = ["Vegan", "Gluten-Free", "Organic", "No Preservatives"]

export default function FilterSidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])

  return (
    <aside className="w-full md:w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => {
                setSelectedCategories((prev) =>
                  prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
                )
              }}
              className="rounded border-gray-300 text-secondary focus:ring-secondary"
            />
            <label htmlFor={category} className="text-gray-700">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary">Price Range</h3>
        {priceRanges.map((range) => (
          <div key={range} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id={range}
              checked={selectedPriceRanges.includes(range)}
              onChange={() => {
                setSelectedPriceRanges((prev) =>
                  prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range],
                )
              }}
              className="rounded border-gray-300 text-secondary focus:ring-secondary"
            />
            <label htmlFor={range} className="text-gray-700">
              {range}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary">Dietary Preferences</h3>
        {dietaryPreferences.map((pref) => (
          <div key={pref} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id={pref}
              checked={selectedPreferences.includes(pref)}
              onChange={() => {
                setSelectedPreferences((prev) =>
                  prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
                )
              }}
              className="rounded border-gray-300 text-secondary focus:ring-secondary"
            />
            <label htmlFor={pref} className="text-gray-700">
              {pref}
            </label>
          </div>
        ))}
      </div>
    </aside>
  )
}

