import { useCallback, useEffect, useRef, useState } from 'react'

const GAME_WIDTH = 500
const GAME_HEIGHT = 150
const GROUND_Y = 120
const CHAR_W = 30
const CHAR_H = 40
const CHAR_X = 50
const GRAVITY = 0.6
const JUMP_VEL = -12
const OBSTACLE_MIN_W = 20
const OBSTACLE_MAX_W = 35
const OBSTACLE_H = 30
const OBSTACLE_SPEED = 5
const SPAWN_INTERVAL_MS = 1800

type Obstacle = { x: number; w: number; h: number }

type Props = {
  onBack: () => void
}

export function WaitingGame({ onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const gameStateRef = useRef({
    charY: GROUND_Y - CHAR_H,
    vy: 0,
    obstacles: [] as Obstacle[],
    lastSpawn: 0,
    running: true,
  })
  const scoreRef = useRef(0)

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      charY: GROUND_Y - CHAR_H,
      vy: 0,
      obstacles: [],
      lastSpawn: 0,
      running: true,
    }
    scoreRef.current = 0
    setScore(0)
    setGameOver(false)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    const draw = () => {
      const state = gameStateRef.current
      if (!state.running) {
        return
      }

      const now = performance.now()

      // spawn obstacles
      if (now - state.lastSpawn > SPAWN_INTERVAL_MS) {
        state.lastSpawn = now
        const w =
          OBSTACLE_MIN_W +
          Math.random() * (OBSTACLE_MAX_W - OBSTACLE_MIN_W)
        state.obstacles.push({
          x: GAME_WIDTH,
          w,
          h: OBSTACLE_H,
        })
      }

      // update character (gravity + jump)
      state.vy += GRAVITY
      state.charY += state.vy
      if (state.charY >= GROUND_Y - CHAR_H) {
        state.charY = GROUND_Y - CHAR_H
        state.vy = 0
      }

      // update obstacles
      state.obstacles = state.obstacles.filter((o) => {
        o.x -= OBSTACLE_SPEED
        if (o.x + o.w < 0) {
          scoreRef.current += 1
          setScore(scoreRef.current)
          return false
        }
        return true
      })

      // collision
      const charLeft = CHAR_X
      const charRight = CHAR_X + CHAR_W
      const charTop = state.charY
      const charBottom = state.charY + CHAR_H

      for (const o of state.obstacles) {
        const oLeft = o.x
        const oRight = o.x + o.w
        const oTop = GROUND_Y - o.h
        const oBottom = GROUND_Y
        if (
          charRight > oLeft &&
          charLeft < oRight &&
          charBottom > oTop &&
          charTop < oBottom
        ) {
          state.running = false
          setGameOver(true)
          return
        }
      }

      // draw
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      ctx.fillStyle = '#475569'
      ctx.fillRect(0, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - GROUND_Y)

      ctx.fillStyle = '#a855f7'
      ctx.fillRect(CHAR_X, state.charY, CHAR_W, CHAR_H)

      ctx.fillStyle = '#64748b'
      for (const o of state.obstacles) {
        ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h)
      }

      rafId = requestAnimationFrame(draw)
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameStateRef.current.vy === 0 && gameStateRef.current.charY >= GROUND_Y - CHAR_H - 2) {
          gameStateRef.current.vy = JUMP_VEL
        }
      }
    }

    const handleClick = () => {
      if (gameStateRef.current.vy === 0 && gameStateRef.current.charY >= GROUND_Y - CHAR_H - 2) {
        gameStateRef.current.vy = JUMP_VEL
      }
    }

    canvas.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKey)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('click', handleClick)
    }
  }, [gameOver])

  return (
    <div className="waiting-game-wrap">
      <p className="waiting-game-score">ניקוד: {score}</p>
      <div className="waiting-game-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="waiting-game-canvas"
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          style={{ width: '100%', maxWidth: GAME_WIDTH }}
        />
      </div>
      {gameOver && <p className="waiting-game-over">המשחק נגמר – איפוס או חזרה</p>}
      <div className="waiting-game-buttons">
        <button type="button" className="waiting-game-btn primary" onClick={resetGame}>
          איפוס
        </button>
        <button type="button" className="waiting-game-btn" onClick={onBack}>
          חזרה למסך השיפוצים
        </button>
      </div>
    </div>
  )
}
