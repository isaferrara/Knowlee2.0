
   import { useState, createContext, useContext, useEffect, useMemo } from "react"
   import React from 'react'
   import { currentUserFn } from '../services/auth'

   const AppCtx = createContext()
   
   export const CtxProvider = props => {
     const [user, setUser] = useState(null)


     useEffect(() => {
      async function getSessionData() {
        const { data: currentUser } = await currentUserFn();
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      }
      getSessionData();
    }, []);

   
      const login = (userInfo) => setUser(userInfo);


      const logout = _ => setUser(null)
     
      const value = useMemo(() => ({ user, login, logout }), [user]);

     return <AppCtx.Provider {...props} value={value} />
   }
   
   export const useContextInfo = () => useContext(AppCtx);
   
