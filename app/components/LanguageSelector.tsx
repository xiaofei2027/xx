'use client'

import { useState } from 'react'

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value
    setSelectedLanguage(language)
    onLanguageChange(language)
  }

  return (
    <div className="space-y-2">
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">
        选择目标语言
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="en">英语</option>
        <option value="es">西班牙语</option>
        <option value="fr">法语</option>
        <option value="de">德语</option>
        <option value="it">意大利语</option>
        <option value="ja">日语</option>
        <option value="ko">韩语</option>
        <option value="zh">中文</option>
      </select>
    </div>
  )
}

