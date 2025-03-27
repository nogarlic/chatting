import { ChatData } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface ContactsProps {
    rooms: ChatData[]
    onSelectRoom: (room: ChatData) => void
    selectedRoom: ChatData | null
}

export default function Contacts({
    rooms,
    onSelectRoom,
    selectedRoom,
}: ContactsProps) {
    return (
        <div className="p-3">
            <div className="p-3">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-bold text-2xl mb-4 xl:mb-1">Chats</p>
                    <div className="flex gap-4">
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-brown-600 cursor-pointer hover:bg-neutral-700 rounded-md p-2"
                        />
                        <FontAwesomeIcon
                            icon={faChartBar}
                            className="text-brown-600 cursor-pointer hover:bg-neutral-700 rounded-md p-2"
                        />
                    </div>
                </div>

                <div>
                    <div className="relative mt-4 mb-2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="w-4 h-4 text-brown-600 cursor-pointer hover:bg-neutral-700 rounded-md p-1"
                            />
                        </div>
                        <input
                            type="text"
                            className="bg-neutral-700 border-b-2 border-gray-300 text-white text-sm rounded-sm block w-full ps-10 p-2.5 
                        focus:border-green-500 focus:bg-neutral-900 outline-none transition-all duration-200"
                            placeholder="Search contacts"
                        />
                    </div>
                </div>
            </div>
            {rooms.map((data) => {
                const isSelected = selectedRoom?.room.id === data.room.id
                const lastMessage =
                    data.comments.length > 0
                        ? data.comments[data.comments.length - 1]
                        : null
                const isCustomer = lastMessage?.sender === 'customer@mail.com'

                return (
                    <div
                        key={data.room.id}
                        onClick={() => onSelectRoom(data)}
                        className={`p-3 cursor-pointer hover:bg-neutral-700 text-white rounded-md xl:mb-2 mb-3 
        ${isSelected ? 'bg-neutral-700' : ''}`}
                    >
                        <div className="flex flex-row items-center gap-4">
                            <img
                                src={data.room.image_url}
                                alt={data.room.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="font-bold text-sm">
                                        {data.room.name}
                                    </p>
                                    <p className="text-xs">
                                        {lastMessage?.time}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-300 text-sm truncate max-w-[200px]">
                                        {isCustomer && (
                                            <FontAwesomeIcon
                                                icon={faCheckDouble}
                                                className="text-brown-600 mr-1"
                                            />
                                        )}
                                        <span className="">
                                            {lastMessage?.message ||
                                                'No messages yet'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
