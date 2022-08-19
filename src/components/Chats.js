import React from "react";
import { useHistory} from "react-router-dom";
import { ChatEngine} from "react-chat-engine";
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext'
const Chats = () => {

    const history = useHistory();
    const { user } =  useAuth();
    
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')

    }
    return (
        <div className = "chats-page">
            <div className="nav-bar">
                <div className = "logo-tab" >
                    War Room Chat
                </div>
                <div onClick ={handleLogout} className = "logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
                height ="calc(100vh-66px)"
                projectId ="294670fa-7af8-40b7-bbd2-e6cc8ed6b483"
                userName="."
                userSecret ="."
            />
        </div>
    )
};

export default Chats;