const getSession = async () => {
  try {
    const response = await fetch(
      'https://url-shortener-frontend-nntg.onrender.com/api/session',
      {
        method: 'GET',
        credentials: 'true', // Include cookies in the request
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch session data!')
    }

    const userData = await response.json()
    console.log('Session Data:', userData)
    return userData // Contains the decoded user object
  } catch (error) {
    console.error('Error fetching session:', error.message)
    return null
  }
}

export const SessionComponent = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    getSession().then(setSession)
  }, [])

  return (
    <div>{session ? `Logged in as ${session.email}` : 'Not logged in'}</div>
  )
}
