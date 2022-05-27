
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { auth, firestore } from "../firebase"
import { useChatScroll, useDataLoader } from 'use-chat-scroll'
import { useAuth } from '../contexts/AuthContext';
import UserList from './UserList';


function Chats() {
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])
    const [value, setValue] = useState([])
    const { user } = useAuth();

    const containerRef = useRef()
    const loader = useDataLoader(conversations, setConversations)
    useChatScroll(containerRef, conversations, loader)

    console.log(useAuth())
    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, "messages"), (docs) => {
            const res = []
            docs.forEach(message => {
                res.push(message.data())
            })

            if (res.length > conversations.length) {
                res.sort((a, b) => new Date(a.createdAt.seconds) - new Date(b.createdAt.seconds))
                setConversations(res);
            }
        });
        
        return unsub
    }, [])

    const handleLogout = async () => {
        await auth.signOut()
        navigate('/')
    }

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "messages"), {
                uid: user.uid,
                displayName: user.email,
                photoURL: user.photoURL,
                text: value,
                createdAt: new Date(),
            })
            console.log("Document written with ID: ", docRef.id);
            setValue('')
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    return (
        <div className="chatsPage">
            <div className="navbar">
                <h1 className="logoTab">
                    Letschat
                </h1>
                <button onClick={handleLogout} className="logoutTab">
                    Logout
                </button>
            </div>
            <UserList/>
            <div className="chatBlock" ref={containerRef}>
                {conversations.map(({ createdAt, text, displayName, uid, photoURL }) => (
                    <div key={createdAt} 
                        style={{
                        background: user.uid === uid ? "#07c160": '#fff',
                        marginLeft: user.uid === uid ? 'auto' : '10px',
                        }}
                        className="userMessageWrap"
                    >  
                    <div className="messageBox">
                        <img id="userImg" src={photoURL ? photoURL : 'https://picsum.photos/50'} alt="" />
                        <div id="userName">{displayName}</div>
                        <div id="message">{text}</div>
                        
                    </div>
                        

                    </div>
                ))}
            </div>
            <label id="chatLabel">
                <input type="text" className="chatInput" value={value} onChange={(e) => { setValue(e.target.value) }} />
                <button className="send" onClick={sendMessage}>Send</button>
            </label>

        </div>
    )
}

export default Chats