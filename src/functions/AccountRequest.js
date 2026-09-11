const API_BASE_URL = 'http://10.155.182.203:8000/api'

export const submitAccountRequest = async ({
  name,
  phone_number,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        phone_number,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Une erreur est survenue lors de l’envoi de la demande.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}