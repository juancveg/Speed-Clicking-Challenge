import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import clickIcon from './assets/click-icon.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    let timer
    if (hasStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsPlaying(false)
      setHasStarted(false)
      if (count > highScore) {
        setHighScore(count)
      }
    }
    return () => clearInterval(timer)
  }, [hasStarted, timeLeft])  // Eliminamos count y highScore de las dependencias

  const startGame = () => {
    setCount(0)
    setTimeLeft(5)
    setIsPlaying(true)
    setHasStarted(true)  // Iniciamos el juego de inmediato
  }

  const handleClick = () => {
    if (isPlaying) {
      setCount((prevCount) => prevCount + 1)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 flex items-center justify-center p-6 fixed w-full">
      <div className="max-w-md w-full">
        <div className="bg-neutral-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-neutral-700">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 blur-2xl"></div>
              <img
                src={clickIcon}
                className="w-20 h-20 relative hover:scale-110 transition-transform duration-300"
                alt="Click Icon"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">
            Speed Clicking Challenge
          </h1>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                <div className="text-sm text-neutral-400 mb-1">Clicks</div>
                <div className="text-2xl font-bold text-white">{count}</div>
              </div>
              <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                <div className="text-sm text-neutral-400 mb-1">Time Left</div>
                <div className="text-2xl font-bold text-white">{timeLeft}s</div>
              </div>
            </div>

            <div className="bg-neutral-700/20 backdrop-blur rounded-xl p-4 border border-neutral-600">
              <div className="text-sm text-neutral-400 mb-1">High Score</div>
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                {highScore} clicks
              </div>
            </div>

            {!isPlaying && timeLeft === 5 && (
              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl 
                font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 
                transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                shadow-lg shadow-green-500/20 select-none"
              >
                Start Game
              </button>
            )}

            {isPlaying && (
              <button
                onClick={handleClick}
                className="w-full py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl 
                font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700 
                transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                shadow-lg shadow-blue-500/20 border border-blue-400/20"
              >
                CLICK ME!
              </button>
            )}

            {!isPlaying && timeLeft === 0 && (
              <div className="space-y-6">
                <div className="text-3xl font-bold text-white animate-pulse">
                  Game Over!
                </div>
                <div className="bg-neutral-700/30 backdrop-blur rounded-xl p-4 border border-neutral-600">
                  <div className="text-sm text-neutral-400 mb-1">Your Speed</div>
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text select-none">
                    {(count / 5).toFixed(1)} clicks/sec
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl 
                  font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700 
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                  shadow-lg shadow-blue-500/20"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App