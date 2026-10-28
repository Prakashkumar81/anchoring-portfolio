import { useState, useEffect } from 'react'

/**
 * useLocalStorage — Persist state to localStorage and keep it in sync.
 * @param {string} key - localStorage key
 * @param {*} initialValue - fallback value if nothing is stored
 * @returns {[any, Function]} - [value, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  // Load initial value from localStorage (lazy initializer)
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: could not parse "${key}"`, error)
      return initialValue
    }
  })

  // Persist whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`useLocalStorage: could not store "${key}"`, error)
    }
  }, [key, value])

  return [value, setValue]
}
