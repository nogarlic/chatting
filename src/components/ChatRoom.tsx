import { useState, useEffect, useRef } from 'react'
import MessageItem from './MessageItem'
import ChatInput from './ChatInput'
import { Room, Comment } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface ChatRoomProps {
    room: Room
    comments: Comment[]
    onBack: () => void
}

export default function ChatRoom({ room, comments, onBack }: ChatRoomProps) {
    const [chatMessages, setChatMessages] = useState<{
        [roomId: number]: Comment[]
    }>({})
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setChatMessages((prev) => ({
            ...prev,
            [room.id]: prev[room.id] || comments,
        }))
    }, [room.id, comments])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages, room.id])

    const handleSendMessage = (
        newMessage: string,
        file?: { url: string; name: string; type: string }
    ) => {
        const newComment: Comment = {
            id: Date.now(),
            type: file?.url ? file.type : 'text',
            message: newMessage,
            sender: 'customer@mail.com',
            fileUrl: file?.url,
            fileName: file?.name,
            time: new Date().toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Jakarta',
            }),
        }

        console.log('New message:', newComment)

        setChatMessages((prev) => ({
            ...prev,
            [room.id]: [...(prev[room.id] || []), newComment],
        }))
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row gap-4 border-b border-gray-900 p-4 bg-neutral-800 fixed top-0 w-full items-center">
                <div className="xl:hidden">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-white cursor-pointer"
                        onClick={onBack}
                    />
                </div>
                <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-12 h-12 rounded-full"
                />
                <div className="">
                    <h2 className="text-base font-bold">{room.name}</h2>
                    <p
                        className={`${room.type === 'single' ? 'hidden' : ''} text-sm truncate max-w-[300px]`}
                    >
                        {room.participant.map((p) => p.name).join(', ')}
                    </p>
                </div>
            </div>

            <div className="flex-1 mt-24 px-4 overflow-y-auto pb-20">
                {(chatMessages[room.id] || []).map((comment) => (
                    <MessageItem
                        key={comment.id}
                        message={comment}
                        roomType={room.type}
                        currentUser="customer@mail.com"
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="fixed bottom-0 xl:w-3/4 w-full">
                <ChatInput roomId={room.id} onSendMessage={handleSendMessage} />
            </div>
        </div>
    )
}
