import React, { useState, useEffect } from 'react'
import axios from 'axios';

function HomePage () {
    const [Message, setMessage] = useState("");

    useEffect(() => {
        axios.get('/api/home')
        .then( res => {
            console.log(res.data.message)
            if(res.data.success) {
                setMessage(res.data.message);
            }
        })
        
    }, [])
    
    
    return (
        <div>
            Home입니다!
            {Message}
        </div>
    )
}

export default HomePage
