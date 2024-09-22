import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Index() {
  const location = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    setMessage("");

    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      headers: {
        "Content-Type": "application/json",  // Set content type to JSON
      },
      method: "POST",
      body: JSON.stringify({ email, password })
    })
    .then(async (res) => {
      let data = await res.json();
      if (!data.success) {
        setMessage(data.message);
      }
      if (data.success) {
        localStorage.setItem("token", data.token);
        location.push("/dashboard");
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token")){
      location.push("/dashboard");
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>
          Submit
        </button>
      </form>
      <p>
        {message}
      </p>
    </>
  )
}
