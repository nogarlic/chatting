import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFile,
    faPaperPlane,
    faSmile,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'

interface ChatInputProps {
    roomId: number
    onSendMessage: (
        message: string,
        file?: {
            url: string
            name: string
            type: string
        }
    ) => void
}

export default function ChatInput({ roomId, onSendMessage }: ChatInputProps) {
    const [messageCache, setMessageCache] = useState<{ [key: number]: string }>(
        {}
    )
    const [fileCache, setFileCache] = useState<{
        [key: number]: { file: File; url: string } | null
    }>({})
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [roomId])

    const handleSendMessage = () => {
        if (!messageCache[roomId]?.trim() && !fileCache[roomId]) return

        const file = fileCache[roomId]

        console.log(file)

        if (file) {
            onSendMessage(messageCache[roomId] || '', {
                url: file.url,
                type: file.file.type,
                name: file.file.name,
            })
        } else {
            onSendMessage(messageCache[roomId] || '', undefined)
        }

        setMessageCache((prev) => ({ ...prev, [roomId]: '' }))
        setFileCache((prev) => ({ ...prev, [roomId]: null }))

        if (textAreaRef.current) textAreaRef.current.style.height = 'auto'
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value
        setMessageCache((prev) => ({ ...prev, [roomId]: newMessage }))

        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setFileCache((prev) => ({
                ...prev,
                [roomId]: { file, url: fileURL },
            }))
        }

        e.target.value = ''
    }

    const handleRemoveFile = () => {
        setFileCache((prev) => ({ ...prev, [roomId]: null }))
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <div className="flex flex-col border-t border-gray-900 p-3 bg-neutral-800 w-full">
            {/* File Preview */}
            {fileCache[roomId] && (
                <div className="flex items-center gap-2 bg-neutral-700 p-2 rounded-lg mb-2">
                    {fileCache[roomId]?.file.type.startsWith('image') ? (
                        <img
                            src={fileCache[roomId]?.url}
                            alt="Preview"
                            className="w-16 h-16 rounded-md object-cover"
                        />
                    ) : fileCache[roomId]?.file.type.startsWith('video') ? (
                        <video
                            src={fileCache[roomId]?.url}
                            className="w-16 h-16 rounded-md"
                            controls
                        />
                    ) : (
                        <p className="text-white text-sm">
                            {fileCache[roomId]?.file.name}
                        </p>
                    )}
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="text-red-400 cursor-pointer"
                        onClick={handleRemoveFile}
                    />
                </div>
            )}

            <div className="flex gap-2 items-center w-full">
                <FontAwesomeIcon
                    icon={faSmile}
                    className="text-gray-400 cursor-pointer hover:bg-neutral-700 rounded-md p-2"
                />

                <label className="text-gray-400 cursor-pointer hover:bg-neutral-700 rounded-md p-2">
                    <FontAwesomeIcon icon={faFile} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        // accept="image/*,video/*,application/pdf"
                    />
                </label>

                <div className="w-full">
                    <textarea
                        ref={textAreaRef}
                        className="w-full bg-neutral-700 border-none text-white text-sm rounded-lg p-2.5 outline-none break-words resize-none"
                        placeholder="Type a message..."
                        value={messageCache[roomId] || ''}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        rows={1}
                        style={{ whiteSpace: 'pre-wrap' }}
                    />
                </div>

                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-gray-400 cursor-pointer hover:text-white p-2"
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    )
}
