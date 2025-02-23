"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy } from "lucide-react"

export default function CopyToClipboard({
  link,
}: {
  link: string,
}) {
  const [copied, setCopied] = useState(false)
  const shareLink = link;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="max-w-md mx-auto p-4 z-[90]">
      <h2 className="text-lg font-semibold mb-2">Share this with your friend to start the game</h2>
      <div className="flex items-center space-x-2">
        <Input value={shareLink} readOnly className="flex-grow text-lg underline" aria-label="Share link" />
        <Button onClick={copyToClipboard} variant="outline" size="icon" aria-label="Copy to clipboard">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      {copied && (
        <p className="text-sm text-green-600 mt-2" role="status">
          Copied to clipboard!
        </p>
      )}
    </div>
  )
}

