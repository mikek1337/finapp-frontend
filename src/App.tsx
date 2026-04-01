import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <span className='text-5xl font-extrabold'>{count}</span>
      <button className='w-fit h-10 px-4 py-2 bg-black text-white rounded-md' onClick={()=>setCount((prev)=>prev+1)}>Count</button>
    </>
  )
}

export default App
