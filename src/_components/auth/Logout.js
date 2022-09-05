import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../_contexts/AuthProvider';

export function Logout() {
    localStorage.removeItem("authUser")
    window.location.reload(false);
}
