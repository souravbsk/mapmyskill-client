import axios from "axios";
import React, { useEffect, useState } from "react";

const useAuthChanged = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("mapmyskill-token");
        if (!token) {
          setUser(null);
          return;
        }
        const res = await axios.get(
          "http://localhost:8080/api/users/checkAuth",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          //console.log(res.data);
          //console.log("data token", res.data);
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setUser(null);
      }
    };
    checkAuth();

    // Check authentication status periodically (e.g., every 5 seconds)
    // const interval = setInterval(checkAuth, 5000);

    // Clear the interval when the component unmounts
    // return () => clearInterval(interval);
  }, []);

  return { user, setUser };
};

export default useAuthChanged;
