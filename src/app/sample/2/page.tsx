'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const PaperCircle = () => {
  useEffect(() => {}, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Paper.js で円を描画</h1>
    </div>
  )
}

export default dynamic(() => Promise.resolve(PaperCircle), { ssr: false })
