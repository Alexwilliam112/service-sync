import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import load from "../assets/load.svg";
import userIcon from "../assets/userIcon.avif";
import RoomCard from "../components/RoomCard";
import { themeContext } from "../context/ThemeContext";

export default function ChatPage_Admin({ socket, url }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(themeContext);
  const chatContainerRef = useRef(null);

  async function fetchRoomList() {
    try {
      setLoading(true);
      let { data } = await axios.get(`${url}/cases`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setRoomList(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (messageSent.trim() !== "") {
      socket.emit(
        "message:new",
        {
          message: messageSent,
          roomId: room,
          username: localStorage.username,
        },
        handleRoomChange(room)
      ); // Include room
      setMessageSent(""); // Clear the message input after sending
    }
  }

  const handleRoomChange = async (newRoom) => {
    const { data } = await axios.get(`${url}/chat-history/${newRoom}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    console.log(data, "ini chat history");
    setMessages(data); // Clear messages when switching rooms

    // setMessages([]); // Clear messages when switching rooms
    console.log({
      message: messageSent,
      roomId: room,
      username: localStorage.username,
    });
    setRoom(newRoom);
    console.log(`ROOM NAME:` + newRoom);
    socket.emit("joinRoom", { room: newRoom });
  };

  useEffect(() => {
    fetchRoomList();
    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();

    socket.emit("joinRoom", { room });

    socket.on("message:update", (newMessage) => {
      // handleRoomChange(room);
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    socket.on("newRoomList", (newRoomList) => {
      const rooms = newRoomList.filter(
        (el) => localStorage.username === el.username
      );
      if(localStorage.username === 'admin1') {
        setRoomList(newRoomList);
      } else {
        setRoomList(rooms)
      }
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {loading ? (
        <div className=" flex h-full w-full items-center justify-center">
          <div>
            <img src={load} alt="" />
          </div>
        </div>
      ) : (
        <>
          <div
            className={
              currentTheme === "light"
                ? "flex h-5/6 flex-row justify-between bg-white"
                : "flex h-5/6 flex-row justify-between bg-zinc-700"
            }>
            <div className="flex max-h-full w-2/5 flex-col overflow-auto border-r-2">
            {console.log(roomList)}
              {roomList.map((el, i) => {
                return (
                  <div key={i} onClick={() => handleRoomChange(el.roomId)}>
                    {/* {console.log(roomList[i], `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ini room  list`)} */}
                    <RoomCard
                      roomData={el}
                      room={room}
                      url={url}
                      roomList={roomList[i]}
                    />
                  </div>
                );
              })}
            </div>
            {room ? (
              <div
                className={
                  currentTheme === "light"
                    ? "flex max-h-full w-full flex-col justify-between px-5"
                    : "flex max-h-full w-full flex-col justify-between bg-gray-900 px-5"
                }>
                <div
                  className=" flex max-h-full w-full flex-col overflow-auto"
                  ref={chatContainerRef}>
                  {messages.map((chat, index) => (
                    <div
                      key={index}
                      className={
                        chat.username !== localStorage.username
                          ? "mb-4 flex w-full justify-start"
                          : "mb-4 flex w-full justify-end"
                      }>
                      {chat.username !== localStorage.username ? (
                        <div className="flex items-start">
                          <img
                            src={userIcon}
                            className="h-12 w-12 rounded-full object-cover"
                            alt="user icon"
                          />
                          <div className="ml-2">
                            <label
                              className={
                                currentTheme === "light"
                                  ? "mb-1 block text-sm text-gray-900"
                                  : "mb-1 block text-sm text-gray-100"
                              }>
                              {chat.username}
                            </label>
                            <div className="flex w-fit justify-center break-words rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-300 px-4 py-3 text-gray-900">
                              <label htmlFor="">{chat.message}</label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end">
                          <div className="mr-2 text-right">
                            <label
                              className={
                                currentTheme === "light"
                                  ? "mb-1 block text-sm text-gray-900"
                                  : "mb-1 block text-sm text-gray-100"
                              }>
                              You
                            </label>
                            <div className="flex w-fit justify-end break-words rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 px-4 py-3 text-white">
                              <label htmlFor="">{chat.message}</label>
                            </div>
                          </div>
                          <img
                            src={userIcon}
                            className="h-12 w-12 rounded-full object-cover"
                            alt="user icon"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form className="relative py-5" onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      className={
                        currentTheme === "light"
                          ? "w-full rounded-xl bg-gray-300 px-3 py-5 pr-16 text-gray-900"
                          : "w-full rounded-xl bg-gray-300 px-3 py-5 pr-16 text-gray-900"
                      }
                      type="text"
                      placeholder="Type your message here..."
                      onChange={(e) => setMessageSent(e.target.value)}
                      value={messageSent}
                    />
                    <button
                      className={
                        currentTheme === "light"
                          ? "btn-base-100 absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-gray-100 p-3"
                          : "btn-base-100 absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-zinc-800 p-3"
                      }
                      type="submit">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="flex h-full w-full items-center justify-center">
                  <div className="grid">
                    <label
                      htmlFor=""
                      className={
                        currentTheme !== "light"
                          ? " text-center text-3xl text-gray-100"
                          : " text-center text-3xl text-gray-900"
                      }>
                      Please Select
                    </label>
                    <label
                      htmlFor=""
                      className={
                        currentTheme !== "light"
                          ? " text-center text-3xl text-gray-100"
                          : " text-center text-3xl text-gray-900"
                      }>
                      A Room
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
