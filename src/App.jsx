import { useState, useEffect, useRef, useCallback } from 'react'
import clickIcon from './assets/click-icon.svg'
import './App.css'

const DURATIONS = [5, 10, 15]

function getRating(cps) {
  if (cps >= 12) return { label: '🔥 Superhuman', color: 'from-red-400 to-pink-500' }
  if (cps >= 8)  return { label: '⚡ Lightning Fast', color: 'from-yellow-400 to-orange-500' }
  if (cps >= 5)  return { label: '🚀 Fast Clicker', color: 'from-green-400 to-emerald-500' }
  if (cps >= 3)  return { label: '👍 Getting There', color: 'from-blue-400 to-cyan-500' }
  return              { label: '🐢 Keep Practicing', color: 'from-neutral-400 to-neutral-500' }
}

function App() {
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState(5)
  const [timeLeft, setTimeLeft] = useState(5)
  const [phase, setPhase] = useState('idle') // idle | playing | result
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('scc-highscore') || '0', 10) } catch { return 0 }
  })
  const [isNewRecord, setIsNewRecord] = useState(false)
  const [clickAnim, setClickAnim] = useState(false)
  const btnRef = useRef(null)

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return
    if (timeLeft <= 0) {
      setPhase('result')
      const newRecord = count > highScore
      if (newRecord) {
        setHighScore(count)
        setIsNewRecord(true)
        try { localStorage.setItem('scc-highscore', count) } catch {}
      }
      return
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [phase, timeLeft])

  const startGame = useCallback(() => {
    setCount(0)
    setTimeLeft(duration)
    setPhase('playing')
    setIsNewRecord(false)
    btnRef.current?.focus()
  }, [duration])

  const handleClick = useCallback(() => {
    if (phase !== 'playing') return
    setCount(c => c + 1)
    setClickAnim(true)
    setTimeout(() => setClickAnim(false), 80)
  }, [phase])

  // Keyboard support: Space / Enter triggers click during game
  useEffect(() => {
    const onKey = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && phase === 'playing') {
        e.preventDefault()
        handleClick()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, handleClick])

  const cps = count / duration
  const rating = getRating(cps)
  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 flex items-center justify-center p-6 fixed w-full">
      <div className="max-w-md w-full">
        <div className="bg-neutral-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-neutral-700">

          {/* Header icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 blur-2xl" />
              <img
                src={clickIcon}
                className={`w-20 h-20 relative transition-transform duration-75 ${clickAnim ? 'scale-90' : 'scale-100'}`}
                alt="Click Icon"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Speed Clicking Challenge
          </h1>

          <div className="space-y-4">

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                <div className="text-sm text-neutral-400 mb-1">Clicks</div>
                <div className="text-2xl font-bold text-white">{count}</div>
              </div>
              <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                <div className="text-sm text-neutral-400 mb-1">Time Left</div>
                <div className={`text-2xl font-bold ${timeLeft <= 2 && phase === 'playing' ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>

            {/* Progress bar (visible during game) */}
            {phase === 'playing' && (
              <div className="w-full bg-neutral-700/40 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* High score */}
            <div className="bg-neutral-700/20 backdrop-blur rounded-xl p-4 border border-neutral-600">
              <div className="text-sm text-neutral-400 mb-1">High Score</div>
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                {highScore} clicks
              </div>
            </div>

            {/* Idle screen */}
            {phase === 'idle' && (
              <div className="space-y-4">
                {/* Duration selector */}
                <div>
                  <div className="text-sm text-neutral-400 mb-2">Duration</div>
                  <div className="grid grid-cols-3 gap-2">
                    {DURATIONS.map(d => (
                      <button
                        key={d}
                        onClick={() => { setDuration(d); setTimeLeft(d) }}
                        className={`py-2 rounded-xl font-bold text-sm transition-all duration-150
                          ${duration === d
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                            : 'bg-neutral-700/40 text-neutral-300 hover:bg-neutral-600/50 border border-neutral-600'
                          }`}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl
                  font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                  shadow-lg shadow-green-500/20 select-none"
                >
                  Start Game
                </button>
                <p className="text-xs text-neutral-500">You can also use Space or Enter to click</p>
              </div>
            )}

            {/* Playing screen */}
            {phase === 'playing' && (
              <button
                ref={btnRef}
                onClick={handleClick}
                className={`w-full py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl
                font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700
                transform active:scale-[0.97] transition-all duration-75
                shadow-lg shadow-blue-500/20 border border-blue-400/20 select-none
                ${clickAnim ? 'brightness-125' : ''}`}
              >
                CLICK ME!
              </button>
            )}

            {/* Result screen */}
            {phase === 'result' && (
              <div className="space-y-4">
                <div className={`text-3xl font-bold text-transparent bg-gradient-to-r ${isNewRecord ? 'from-yellow-400 to-orange-500 animate-bounce' : 'from-white to-neutral-300'} bg-clip-text`}>
                  {isNewRecord ? '🏆 New Record!' : 'Game Over!'}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                    <div className="text-sm text-neutral-400 mb-1">Your Speed</div>
                    <div className="text-xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
                      {cps.toFixed(1)} c/s
                    </div>
                  </div>
                  <div className="bg-neutral-700/30 backdrop-blur rounded-xl px-4 py-3 border border-neutral-600">
                    <div className="text-sm text-neutral-400 mb-1">Rating</div>
                    <div className={`text-sm font-bold text-transparent bg-gradient-to-r ${rating.color} bg-clip-text`}>
                      {rating.label}
                    </div>
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

                <button
                  onClick={() => { setPhase('idle'); setCount(0); setTimeLeft(duration) }}
                  className="w-full py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Change Duration
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
