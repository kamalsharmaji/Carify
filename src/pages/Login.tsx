 import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TEMP: fake login
    localStorage.setItem("accessToken", "demo-token");
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "SUPER_ADMIN",
        permissions: [
          "USER_VIEW",
          "ROLE_MANAGE",
          "FLEET_VIEW",
          "VEHICLE_INSPECTION_VIEW",
          "HRM_VIEW",
        ],
      })
    );
    navigate("/dashboard/inspection");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 font-bold text-center">Carify Login</h2>

        <input
          value={email}
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <input
          value={password}
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
