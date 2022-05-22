
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore"
import { auth, firestore } from "../firebase"

function Chats() {
    const navigate = useNavigate()
    const [ conversations, setConversations ] = useState([])
    const [ value, setValue ] = useState([])
    const [ user ] = useAuthState(auth)

    console.log("user", user)

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, "messages"), (querySnapshot) => {
            const res = [];
            querySnapshot.forEach((doc) => {
                res.push(doc.data());
            });

            if (res.length > conversations.length) {
                res.sort((a, b) => new Date(a.createdAt.seconds) - new Date(b.createdAt.seconds))
                setConversations(res);
            }
        });

        return unsub
    })
    console.log("conversations", conversations)
    
    const handleLogout = async() => {
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
    
    return(
        <div className="chatsPage">
            <div className="navbar">
                <h1 className="logoTab">
                    Letschat
                </h1>
                <button onClick={handleLogout} className="logoutTab">
                    Logout
                </button>
            </div>
            <div className="chatBlock">
                {conversations.map(({ createdAt, text, displayName }) => (
                    <li key={createdAt}>{displayName} 
                        <div>{text}</div>
                    </li>
                ))}
            </div>
            <label id="chatLabel">
                <input type="text" className="chatInput" value={value} onChange={(e) => {setValue(e.target.value)}} />
                <button className="send" onClick={sendMessage}>Send</button>
            </label>
            
        </div>
    )
}

export default Chats