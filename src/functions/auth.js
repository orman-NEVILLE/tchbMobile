const API_BASE_URL = 'http://10.155.182.203:8000/api'

export const login = async ({
  phone_number,
  password,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        phone_number,
        password,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Une erreur est survenue lors de la connexion.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}