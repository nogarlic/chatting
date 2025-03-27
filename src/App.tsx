import { useEffect, useState } from "react";
import Contacts from "./components/Contacts";
import ChatRoom from "./components/ChatRoom";
import { ChatData } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMessage } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function App() {
  const [chatData, setChatData] = useState<ChatData[] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<ChatData | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    fetch("/data/chat.json")
      .then((res) => res.json())
      .then((data) => setChatData(data.results))
      .catch((err) => console.error("Gagal fetch data:", err));
  }, []);

  return (
    <div className="flex flex-col xl:flex-row h-screen">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        className={`xl:w-1/4 w-full xl:h-full min-h-screen overflow-x-hidden overflow-y-auto bg-neutral-800 border-r border-gray-900 ${
          isMobileChatOpen ? "hidden" : "block"
        } xl:block`}
      >
        {chatData ? (
          <Contacts
            rooms={chatData}
            onSelectRoom={(room) => {
              setSelectedRoom(room);
              setIsMobileChatOpen(true);
            }}
            selectedRoom={selectedRoom}
          />
        ) : (
          <p className="text-white text-center">Loading...</p>
        )}
      </motion.div>

      {selectedRoom ? (
  <motion.div
    key={selectedRoom.room.id}
    initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.3 }}
    className={`w-full xl:w-3/4 h-full overflow-auto ${
      isMobileChatOpen ? "block" : "hidden"
    } xl:block`}
  >
    <ChatRoom
      room={selectedRoom.room}
      comments={selectedRoom.comments}
      onBack={() => {
        setSelectedRoom(null);
        setIsMobileChatOpen(false);
      }}
    />
  </motion.div>
) : (
  <p className="ml-10 xl:block mt-10 hidden">
    Pilih chat untuk memulai
  </p>
)}


      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          isMobileChatOpen ? "hidden" : "flex"
        } xl:hidden flex-row w-full px-24 bg-neutral-900 py-3 justify-between fixed bottom-0 rounded-t-2xl`}
      >
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsMobileChatOpen(false)}
        >
          <div className="bg-emerald-900/40 rounded-full p-2">
            <FontAwesomeIcon icon={faMessage} className="text-white" />
          </div>
          <p className="font-bold mt-2 text-white">Chats</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full p-2">
            <FontAwesomeIcon icon={faPhone} className="text-white" />
          </div>
          <p className="font-bold mt-2 text-white">Calls</p>
        </div>
      </motion.div>
    </div>
  );
}
