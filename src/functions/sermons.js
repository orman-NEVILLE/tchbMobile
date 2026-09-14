const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getSermons = async () => {
  const response = await fetch(
    `${API_BASE_URL}/sermons`,
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
        'Impossible de récupérer les prédications.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

export const getSermon = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/sermons/${id}`,
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
        'Impossible de récupérer la prédication.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}