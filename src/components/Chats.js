import React, { useRef, useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { ChatEngine} from "react-chat-engine";
import { auth } from '../firebase';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext'
const Chats = () => {

    const history = useHistory(); //useHistory redirects users to anotherpage (react hook)
    const { user } =  useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch (url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }
    useEffect(() => {
        if(!user){
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "294670fa-7af8-40b7-bbd2-e6cc8ed6b483",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })

        .then (() => {
            setLoading(false);
        })
        .catch (() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);


            getFile(user.photoURL)
                .then((avatar) =>{
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users',
                    formdata,
                    {headers: { "private-key": "02ccdb27-1ebf-4fe9-a314-9a7610055c86"}}
                    )

                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'loading..'
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
                projectID ="294670fa-7af8-40b7-bbd2-e6cc8ed6b483"
                userName={user.email}
                userSecret = {user.uid}
            />
        </div>
    )
};

export default Chats;