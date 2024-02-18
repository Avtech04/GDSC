import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

const AppProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState({});
  
  const [problemID, setProblemID] = useState({});
  const [problemHeadline, setProblemHeadline] = useState({});
  const [problemDescription, setProblemDescription] = useState({});
  const [NgoUser, setNgoUser] = useState({});


  return (
    <Appcontext.Provider
      value={{
       setUserEmail,
       userEmail,
       setProblemHeadline,
       problemHeadline,
       setProblemDescription,
       problemDescription,
       setProblemID,
       problemID,
      NgoUser,
      setNgoUser 
         }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const Appstate = () => {
  return useContext(Appcontext);
};

export default AppProvider;