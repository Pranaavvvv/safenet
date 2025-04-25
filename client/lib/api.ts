// This file provides a structured way to interact with your backend API

/**
 * Base API client for making requests to your backend
 */
export const api = {
  /**
   * Make a GET request to the API
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`/api/${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Make a POST request to the API
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Make a PUT request to the API
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`/api/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`/api/${endpoint}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },
}

/**
 * Emergency-related API functions
 */
export const emergencyApi = {
  /**
   * Trigger an emergency alert
   */
  async triggerAlert(data: { location: any; message?: string }) {
    return api.post("emergency/alert", data)
  },

  /**
   * Get emergency contacts
   */
  async getContacts() {
    return api.get("emergency/contacts")
  },

  /**
   * Add an emergency contact
   */
  async addContact(contact: { name: string; phone: string; relationship: string }) {
    return api.post("emergency/contacts", contact)
  },
}

/**
 * Map-related API functions
 */
export const mapApi = {
  /**
   * Get safety markers for the map
   */
  async getMarkers(location: { lat: number; lng: number; radius?: number }) {
    return api.get(`map/markers?lat=${location.lat}&lng=${location.lng}&radius=${location.radius || 5}`)
  },

  /**
   * Report an incident
   */
  async reportIncident(data: { location: any; description: string; type: string }) {
    return api.post("map/incidents", data)
  },
}

/**
 * User-related API functions
 */
export const userApi = {
  /**
   * Get user profile
   */
  async getProfile() {
    return api.get("user/profile")
  },

  /**
   * Update user profile
   */
  async updateProfile(data: any) {
    return api.put("user/profile", data)
  },

  /**
   * Get user safety score
   */
  async getSafetyScore() {
    return api.get("user/safety-score")
  },
}
