

import React, { useState, useEffect } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [frogPosition, setFrogPosition] = useState(getRandomPosition());
  const [gameOver, setGameOver] = useState(false);
  const [lastClickedTime, setLastClickedTime] = useState(Date.now());

  function rf(){
    location.reload
  }
  // Генерация случайной позиции
  function getRandomPosition() {
    const maxX = window.innerWidth - 100; // Размеры экрана для случайной позиции
    const maxY = window.innerHeight - 100;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };
  }

  // Функция для обновления позиции лягушки
  function moveFrog() {
    setFrogPosition(getRandomPosition());
    setLastClickedTime(Date.now());
  }

  // Обработка клика по лягушке
  function handleClick() {
    if (gameOver) return;
    setScore(prevScore => prevScore + 1);
    moveFrog();
  }

  // Таймер для уменьшения времени
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastClickedTime >= 2000) {
        // Если прошло больше 2 секунд без клика, лягушка перемещается
        moveFrog();
      }

      if (time > 0) {
        setTime(prevTime => prevTime - 1);
      } else {
        setGameOver(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, lastClickedTime, gameOver]);

  // Функция для вычисления градиента, который меняется с временем
  function getGradient() {
    const red = Math.min(255, (15 - time) * 17); // увеличиваем красный компонент с уменьшением времени
    const green = Math.min(255, time * 17); // увеличиваем зеленый компонент с увеличением времени
    return `linear-gradient(90deg, rgb(${red}, ${green}, 255) 0%, rgb(255, ${green}, ${red}) 100%)`;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: getGradient(), // Применяем градиентный фон
        transition: "background 1s ease" // Плавная анимация фона
      }}
      onClick={handleClick}
    >
      <div
        style={{
          position: "absolute",
          top: frogPosition.y,
          left: frogPosition.x,
          width: "50px",
          height: "50px",
          backgroundColor: "green",
          borderRadius: "50%",
          cursor: "pointer"
        }}
      >
        
      </div>
      <div style={{  color: "white", textAlign:'center', margin:' auto'}}>
        <h1>Ballar: {score}</h1>
        <h2>Voqt: {time}</h2>
        {gameOver && <h2>Balaringiz: {score}</h2>}
        {/* <button onClick={rf()}>Oyini boshqatan boshlash</button> */}
      </div>
    </div>
  );
};

export default App;
