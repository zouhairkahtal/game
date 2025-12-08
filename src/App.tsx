import { useEffect, useState } from "react";
import Airplane from "../public/airplane.svg";

type FallingItem = {
  id: number;
  left: number;
  top: number;
};

function App() {
  const [y, setLeft] = useState(900);   // airplane X
  const [x, setTop] = useState(800);    // airplane Y
  const [items, setItems] = useState<FallingItem[]>([]);

  // Spawn falling items
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 1600,
          top: -50,
        },
      ]);
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLeft((prev) => (prev >= 1800 ? prev : prev + 30));
      if (e.key === "ArrowLeft")
        setLeft((prev) => (prev <= 80 ? prev : prev - 30));
      if (e.key === "ArrowUp")
        setTop((prev) => (prev <= 0 ? prev : prev - 30));
      if (e.key === "ArrowDown")
        setTop((prev) => (prev >= 850 ? prev : prev + 30));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Falling items movement + collision check
  useEffect(() => {
    const fallInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({
            ...item,
            top: item.top + 10,
          }))
          .filter((item) => item.top < 900)
      );
    }, 50);

    return () => clearInterval(fallInterval);
  }, []);

  // Collision detection
  useEffect(() => {
    items.forEach((item) => {
      const distX = Math.abs(item.left - y);
      const distY = Math.abs(item.top - x);

      if (distX <40 && distY < 40) {
        alert("You lose!");
        window.location.reload();
      }
    });
  }, [items, x, y]);

  return (
    <div className="w-full h-screen bg-sky-300 relative overflow-hidden">

      {items.map((item) => (
        <div
          key={item.id}
          className="w-10 h-10 bg-red-500 rounded-full absolute"
          style={{
            top: item.top,
            left: item.left,
          }}
        />
      ))}

   
        <img className=" w-32 h-32 absolute -rotate-45 " src={Airplane}
        style={{
          top: x,
          left: y,
          transition: "0.15s ease",
        }} />
      </div>

  );
}

export default App;
