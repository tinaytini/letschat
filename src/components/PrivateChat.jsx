import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { addDoc, collection, onSnapshot, where, query } from "firebase/firestore"
import { firestore } from "../firebase"
import { useAuth } from '../contexts/AuthContext';

function PrivateChat() {
    const [value, setValue] = useState('')
    const [conversations, setConversations] = useState([])
    const [conversations1, setConversations1] = useState([])
    const [conversations2, setConversations2] = useState([])
    const { companion } = useParams()
    const { user } = useAuth()

    const q1 = query(
        collection(firestore, "private-messages"),
        where('sender', '==', user.email),
        where('receiver', '==', companion)
    )

    const q2 = query(
        collection(firestore, "private-messages"),
        where('sender', '==', companion),
        where('receiver', '==', user.email)
    )

    useEffect(() => {
        const unsub = onSnapshot(q1, (docs) => {
            const res = []
            docs.forEach(message => {
                res.push(message.data())
            })

            if (res.length > conversations1.length) {
                setConversations1(res);
            }
        });

        return unsub
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(q2, (docs) => {
            const res = []
            docs.forEach(message => {
                res.push(message.data())
            })

            if (res.length > conversations2.length) {
                setConversations2(res);
            }
        });

        return unsub
    }, [])

    useEffect(() => {
        const sortedConversations = [...conversations1, ...conversations2].sort(
            (a, b) => new Date(a.createdAt.seconds) - new Date(b.createdAt.seconds)
        )
        setConversations(sortedConversations)
    }, [conversations1.length, conversations2.length])

    const handleSendMessage = async () => {
        try {
            await addDoc(collection(firestore, "private-messages"), {
                receiver: companion,
                sender: user.email,
                photoURL: user.photoURL,
                text: value,
                createdAt: new Date(),
            })
            setValue('')
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    return (
        <div className="chatsPage">
            <div className="chatBlock">
                {conversations.map(({ sender, createdAt, text, photoURL }) => (
                    <div key={createdAt}
                        style={{
                            background: user.email === sender ? "#07c160" : '#fff',
                            marginLeft: user.email === sender ? 'auto' : '10px',
                        }}
                        className="userMessageWrap"
                    >
                        <div className="messageBox">
                            <img id="userImg" src={photoURL ? photoURL : 'https://picsum.photos/50'} alt="" />
                            <div id="userName">{sender}</div>
                            <div id="message">{text}</div>
                        </div>
                    </div>

                ))}
            </div>
            <label className="chatLabel">
                <input
                    type="text"
                    className="chatInput"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />
                <button
                    disabled={!value.length}
                    className="send" 
                    onClick={handleSendMessage}
                >
                Send
                </button>
            </label>

        </div>
    )
}

export default PrivateChat
