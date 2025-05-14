import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Home() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8003/profile", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          console.log("Error in response");
          return;
        }

        const data = await response.json();
        
        if (data && data.name && data.email) {
          const { name, email } = data;
          setUserInfo({ name, email });
        } else {
          console.log("Error in data || missing name/email");
        }
      } catch (error) {
        console.log("Error:", error);
        if (error instanceof Error) {
          console.error('Message:', error.message);
          console.error('Stack trace:', error.stack);
        }
      }
    };

    fetchUser();
  }, []);




  return (
    <div>
      <h5 className="welcome">Welcome: {userInfo.name}</h5>
      <h5>{userInfo.email}</h5>
    </div>
  )
}

export default Home