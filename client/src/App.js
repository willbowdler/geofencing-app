import { useState, useEffect } from 'react'

function App() {
  const [apiData, setApiData] = useState('')
  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setApiData(data))
  }, [])

  return <h1>{`${apiData.message}`}</h1>
}

export default App
