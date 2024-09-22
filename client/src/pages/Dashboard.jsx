import { useEffect, useState } from "react"
import { getAuthToken } from "../utils/auth";
import { useHistory } from "react-router";

export default function Dashboard() {

  const location = useHistory();

  function verifyToken(token) {
    fetch("http://localhost:3000/api/auth/verify-token", {
      headers: {
        "Content-Type": "application/json",  // Set content type to JSON
      },
      method: "POST",
      body: JSON.stringify({ token })
    })
    .then(async (res) => {
      let data = await res.json();
      if (!data.authenticated) {
        localStorage.removeItem("token");
        alert(data.message);
        location.push("/");
      }
    }); 
  }


  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      location.push("/");
    }
    else {
      verifyToken(token);
    }
  }, []);

  return (
    <div>
      Dashboard page
    </div>
  )
}
