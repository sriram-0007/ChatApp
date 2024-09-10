import { useState,useEffect } from "react";
import { addDoc, collection,serverTimestamp, onSnapshot ,where,query,orderBy} from 'firebase/firestore'
import { db ,auth} from "../firebase-config";
export const Chat=(props)=>{
    const {room}=props;
    const [newMessage,setNewMessage]=useState("");
    const [messages,setMessages]=useState([])
    const messagesRef=collection(db,"messages");

    useEffect(()=>{
        const queryMessage=query(messagesRef,where("room","==",room),orderBy("createdAt"));
        const unsuscribe=onSnapshot(queryMessage,(sanpshot)=>{
            let message=[];
            sanpshot.forEach((doc)=>{
                message.push({...doc.data(),id:doc.id});
            });
            setMessages(message);
        })
        return ()=>unsuscribe();
    },[])



    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(newMessage);
        if(newMessage ==="") return;

        await addDoc(messagesRef,{
            text:newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };
    return <div className="chat-app">
        <div><h1>Welcome to:{room.toUpperCase()}</h1></div>
        <div>{ messages.map((message)=>(
            <div className="message" key={message.id}>
                <span className="user">{message.user} </span>
                {message.text}
            </div>
        ))}</div>
        <form onSubmit={handleSubmit}  className="new-message-form">
            <input className="new-message-input" placeholder="Type your message here"
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}/>
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>
}