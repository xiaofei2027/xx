'use client'

import { useState, useEffect } from 'react'
import { getProcessingStatus, getSubtitles } from '../actions'
import { Download } from 'lucide-react'
import SubtitlePreview from './SubtitlePreview'

export default function DownloadVideo() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [subtitles, setSubtitles] = useState('')

  useEffect(() => {
    const checkStatus = async () => {
      const status = await getProcessingStatus()
      setIsCompleted(status === 'completed')
      if (status === 'completed') {
        const generatedSubtitles = await getSubtitles()
        setSubtitles(generatedSubtitles)
      }
    }

    checkStatus()
  }, [])

  if (!isCompleted) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SubtitlePreview subtitles={subtitles} />
        <a
          href="/api/download"
          download
          className="inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          下载处理后的视频
        </a>
      </div>
    </div>
  )
}

