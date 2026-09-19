const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Récupérer tous les chants
 */
export const getChants = async () => {
  const response = await fetch(
    `${API_BASE_URL}/chants`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Impossible de récupérer les chants.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

/**
 * Récupérer les chants récents
 */
export const getRecentChants = async () => {
  const response = await fetch(
    `${API_BASE_URL}/chants/recent`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Impossible de récupérer les chants récents.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

/**
 * Récupérer un chant par son ID
 */
export const getChant = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/chants/${id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Impossible de récupérer le chant.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

/**
 * Construire l'URL d'un média
 *
 * type : audio | video
 */
export const getChantMediaUrl = (id, type) => {
  return `${API_BASE_URL}/chants/${id}/media/${type}`
}