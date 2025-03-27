import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

interface MessageProps {
    message: {
        id: number
        type: string
        message: string
        sender: string
        fileName?: string
        fileUrl?: string
        time: string
    }
    currentUser: string
    roomType: string
}

const getColorForSender = (sender: string) => {
    const colors = [
        'text-blue-600',
        'text-green-600',
        'text-purple-600',
        'text-red-600',
        'text-yellow-600',
    ]
    const index =
        sender.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        colors.length
    return colors[index]
}

const MessageItem: React.FC<MessageProps> = ({
    message,
    currentUser,
    roomType,
}) => {
    const isSender = message.sender === currentUser
    const messageColor = getColorForSender(message.sender)
    const [isLoading, setIsLoading] = useState(true);

    const renderMessageContent = () => {
        if (message.type.startsWith('image')) {
            return (
                <div>
                    {isLoading && (
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md mt-3 md:max-w-xs h-40 w-full" />
                    )}
                    <img
                            src={message.fileUrl}
                            alt="Sent image"
                            className={`rounded-lg shadow-md mt-3 md:max-w-xs transition-opacity duration-300 ${
                                isLoading ? "opacity-0" : "opacity-100"
                            }`}
                            onLoad={() => setIsLoading(false)}
                        />
                    {message.message ? (
                        <p className="text-sm break-words whitespace-pre-wrap mt-2">
                            {message.message}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            )
        }
        if (message.type.startsWith('video')) {
            return (
                <div>
                    <video
                        controls
                        className="rounded-lg shadow-md mt-3 md:max-w-xs"
                    >
                        <source src={message.fileUrl} type={message.type} />
                    </video>
                    {message.message ? (
                        <p className="text-sm break-words whitespace-pre-wrap mt-2">
                            {message.message}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            )
        }
        if (message.type === 'application/pdf') {
            return (
                <div>
                    <div
                        className={`${isSender ? 'bg-emerald-800' : 'bg-neutral-600'} rounded-sm mt-3`}
                    >
                        <div className="flex flex-row p-2 items-center gap-3 ">
                            <FontAwesomeIcon icon={faFilePdf} />
                            <p className="truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                                {message.fileName}
                            </p>
                        </div>
                        <div className="p-2">
                            <div
                                className={`${isSender ? 'bg-emerald-700' : 'bg-neutral-500'} flex items-center justify-center rounded-sm px-3 py-2 hover:bg-emerald-500`}
                            >
                                <a
                                    href={message.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-center"
                                >
                                    View PDF
                                </a>
                            </div>
                        </div>
                    </div>
                    {message.message ? (
                        <p className="text-sm break-words whitespace-pre-wrap mt-2">
                            {message.message}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            )
        }
        if (
            message.type.startsWith('application/') ||
            message.type.startsWith('text/')
        ) {
            return (
                <div>
                    <div className="flex items-center gap-2 bg-emerald-800 p-2 rounded-md">
                        <FontAwesomeIcon
                            icon={faFileAlt}
                            className="text-white text-xl"
                        />
                        <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline break-all"
                        >
                            {
                                <p className="truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                                    {message.fileName}
                                </p>
                            }
                        </a>
                    </div>
                    {message.message ? (
                        <p className="text-sm break-words whitespace-pre-wrap mt-2">
                            {message.message}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            )
        }
        return (
            <p className="text-sm break-words whitespace-pre-wrap">
                {message.message}
            </p>
        )
    }

    return (
        <div
            className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
        >
            <div
                className={`xl:max-w-xl lg:max-w-lg max-w-11/12 p-2 rounded-lg text-white flex flex-col ${isSender ? 'bg-emerald-900' : 'bg-neutral-700'}`}
            >
                <p
                    className={`text-sm ${messageColor} ${isSender || roomType == 'single' ? 'hidden' : ''}`}
                >
                    ~ {message.sender}
                </p>
                {renderMessageContent()}
                <span className="text-[10px] text-gray-300 self-end mt-1">
                    {message.time}
                </span>
            </div>
        </div>
    )
}

export default MessageItem
