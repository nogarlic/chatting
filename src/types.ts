export interface Participant {
    id: string
    name: string
    role: number
}

export interface Room {
    id: number
    name: string
    image_url: string
    participant: Participant[]
    type: string
}

export interface Comment {
    id: number
    type: string
    message: string
    sender: string
    fileUrl: string | undefined
    fileName: string | undefined
    time: string
}

export interface ChatData {
    room: Room
    comments: Comment[]
}
