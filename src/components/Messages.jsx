import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { firestore } from "../firebase"
import { useAuth } from '../contexts/AuthContext';

function Messages() {
    const [conversations, setConversations] = useState([])
    const [conversations1, setConversations1] = useState([])
    const [conversations2, setConversations2] = useState([])
    const { user } = useAuth()

    const q1 = query(
        collection(firestore, "private-messages"),
        where('sender', '==', user.email),
    )

    const q2 = query(
        collection(firestore, "private-messages"),
        where('sender', '==', user.email),
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
        const uniqueConversations = new Set()
        const sortedConversations = [...conversations1, ...conversations2]
            .sort((a, b) => new Date(b.createdAt.seconds) - new Date(a.createdAt.seconds))
        sortedConversations.forEach(({ receiver, sender }) => {
            uniqueConversations.add(receiver === user.email ? sender : receiver)
        })
        setConversations(Array.from(uniqueConversations))
    }, [conversations1.length, conversations2.length])

    return(
        <div className="chatsPage">
            <div className="chatBlock">
                {conversations.map(email => (
                    <li key={email}>
                        <Link to={`/chats/${email}`}>{email}</Link>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Messages;