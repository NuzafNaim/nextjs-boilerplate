"use client"
import { useState } from 'react'
import React from 'react'

const Footer = () => {

    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }


  return (
    <footer className="bg-white/50 z-10 backdrop-blur">
      <div className="mx-auto max-w-4xl text-center py-6 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} N2S Boiler Nextjs.</p>
        <p>
          You have clicked the following button {count} times. <button onClick={increment}>Click Me</button>
        </p>
      </div>
    </footer>
  )
}

export default Footer