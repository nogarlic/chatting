import { useEffect, useState } from 'react'
import Contacts from './components/Contacts'
import ChatRoom from './components/ChatRoom'
import { ChatData } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMessage } from '@fortawesome/free-solid-svg-icons'

export default function App() {
    const [chatData, setChatData] = useState<ChatData[] | null>(null)
    const [selectedRoom, setSelectedRoom] = useState<ChatData | null>(null)
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

    useEffect(() => {
        fetch('/data/chat.json')
            .then((res) => res.json())
            .then((data) => setChatData(data.results))
            .catch((err) => console.error('Gagal fetch data:', err))
    }, [])

    return (
        <div className="flex flex-col xl:flex-row h-screen">
            <div
                className={`xl:w-1/4 w-full xl:h-full min-h-screen overflow-x-hidden overflow-y-auto bg-neutral-800 border-r border-gray-900
        ${isMobileChatOpen ? 'hidden' : 'block'} xl:block`}
            >
                {chatData ? (
                    <Contacts
                        rooms={chatData}
                        onSelectRoom={(room) => {
                            setSelectedRoom(room)
                            setIsMobileChatOpen(true)
                        }}
                        selectedRoom={selectedRoom}
                    />
                ) : (
                    <p className="text-white text-center">Loading...</p>
                )}
            </div>

            <div
                className={`w-full xl:w-3/4 h-full overflow-auto ${
                    isMobileChatOpen ? 'block' : 'hidden'
                } xl:block`}
            >
                {selectedRoom ? (
                    <>
                        <ChatRoom
                            room={selectedRoom.room}
                            comments={selectedRoom.comments}
                            onBack={() => setSelectedRoom(null)}
                        />
                    </>
                ) : (
                    <>
                        <div>
                            <div
                                className={`xl:w-1/4 w-full xl:h-full min-h-screen overflow-x-hidden overflow-y-auto bg-neutral-800 border-r border-gray-900 xl:hidden`}
                            >
                                {chatData ? (
                                    <Contacts
                                        rooms={chatData}
                                        onSelectRoom={(room) => {
                                            setSelectedRoom(room)
                                            setIsMobileChatOpen(true)
                                        }}
                                        selectedRoom={selectedRoom}
                                    />
                                ) : (
                                    <p className="text-white text-center">
                                        Loading...
                                    </p>
                                )}
                            </div>
                            <div
                                className={`flex xl:hidden flex-row w-full px-24 bg-neutral-900 py-3 justify-between absolute bottom-0 rounded-t-2xl`}
                            >
                                <div
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => setIsMobileChatOpen(false)}
                                >
                                    <div className="bg-emerald-900/40 rounded-full p-2">
                                        <FontAwesomeIcon
                                            icon={faMessage}
                                            className="text-white"
                                        />
                                    </div>
                                    <p className="font-bold mt-2 text-white">
                                        Chats
                                    </p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-full p-2">
                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            className="text-white"
                                        />
                                    </div>
                                    <p className="font-bold mt-2 text-white">
                                        Calls
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-center xl:block mt-10 hidden">
                            Pilih chat untuk memulai
                        </p>
                    </>
                )}
            </div>

            <div
                className={`${isMobileChatOpen ? 'hidden' : 'flex'} xl:hidden flex-row w-full px-24 bg-neutral-900 py-3 justify-between absolute bottom-0 rounded-t-2xl`}
            >
                <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setIsMobileChatOpen(false)}
                >
                    <div className="bg-emerald-900/40 rounded-full p-2">
                        <FontAwesomeIcon
                            icon={faMessage}
                            className="text-white"
                        />
                    </div>
                    <p className="font-bold mt-2 text-white">Chats</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="rounded-full p-2">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="text-white"
                        />
                    </div>
                    <p className="font-bold mt-2 text-white">Calls</p>
                </div>
            </div>
        </div>
    )
}
