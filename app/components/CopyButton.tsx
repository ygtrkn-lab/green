'use client'

import { FC } from 'react'
import { Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
  size?: 'sm' | 'md'
}

const CopyButton: FC<CopyButtonProps> = ({ text, size = 'sm' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="text-primary hover:text-primary-dark transition-colors"
    >
      <Copy className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
    </button>
  )
}

export default CopyButton
