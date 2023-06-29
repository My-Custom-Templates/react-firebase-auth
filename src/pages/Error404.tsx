import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center font-semibold">
      <div className="text-red-500">Error 404</div>
      <div>
        Redirecting you to the home page in 3 secs
      </div>
    </div>
  );
}
