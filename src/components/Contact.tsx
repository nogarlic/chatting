import React from 'react'

interface ContactProps {
    name: string
    message: string
    time: string
    image: string
}

const Contact: React.FC<ContactProps> = ({ name, message, time, image }) => {
    return (
        <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <img
                src={image}
                alt={name}
                className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex-1">
                <h4 className="text-white font-medium">{name}</h4>
                <p className="text-gray-400 text-sm truncate">{message}</p>
            </div>
            <div className="text-right">
                <span className="text-gray-400 text-xs">{time}</span>
            </div>
        </div>
    )
}

export default Contact
