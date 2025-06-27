import { useEffect, useState } from 'react'
import { HealthRepository } from './repositories'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>({});

  useEffect(() => {
    HealthRepository.up().then(res => {
      setData(res);
    })
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
