import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import { AuthContext } from '../../_contexts/AuthProvider';

export async function RefreshToken() {
    const navigate = useNavigate();
    axios.get(HOSTNAME + API_LINK.REFRESH_TOKEN).then((res) => {
          if (res.data.status === "Success") {
            setAuth(res.data.data)
            setIsLogin(true)
            localStorage.setItem("authUser", JSON.stringify(res.data.data))
            navigate("/")
            console.log("Token refreshed.")
          } else if (res.data.status === "Failed") {
            alert(res.data.error)
          } else alert("System error.")
        })
}
