import { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import NeonBackground from './NeonBackground'

function FloatingCard({ children, delay = 0 }) {
  return (
    <motion.div
      className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/10 p-6 sm:p-8"
      initial={{ y: 20, opacity: 0, rotateX: -5 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-500/10 via-yellow-400/10 to-transparent blur-xl -z-0" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

function ParallaxContainer({ children }) {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(springY, [ -50, 50 ], [ 8, -8 ])
  const rotateY = useTransform(springX, [ -50, 50 ], [ -8, 8 ])

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx / 8)
    y.set(dy / 8)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <NeonBackground />

      {/* Hero with Spline 3D */}
      <section className="relative h-[70vh] sm:h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient overlay to enhance contrast, allow interaction with scene */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative z-10 container mx-auto px-6 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight"
          >
            Aarav Tatiya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mt-4 max-w-xl text-neutral-300"
          >
            Building modern, minimal interfaces with depth, motion, and a futuristic vibe.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <FloatingCard>
              <div className="space-y-2">
                <p className="text-sm text-neutral-400">Role</p>
                <p className="text-lg">Designer & Frontend Developer</p>
              </div>
            </FloatingCard>
            <FloatingCard delay={0.05}>
              <div className="space-y-2">
                <p className="text-sm text-neutral-400">Focus</p>
                <p className="text-lg">3D, Motion, Web Experiences</p>
              </div>
            </FloatingCard>
            <FloatingCard delay={0.1}>
              <div className="space-y-2">
                <p className="text-sm text-neutral-400">Location</p>
                <p className="text-lg">Pune, India</p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="relative py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8">
          <ParallaxContainer>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="relative">
                <div className="h-48 w-48 md:h-56 md:w-56 rounded-2xl bg-gradient-to-br from-red-600/40 via-yellow-400/20 to-white/10 border border-white/10 backdrop-blur-xl shadow-2xl shadow-red-500/20 flex items-center justify-center overflow-hidden">
                  <span className="text-neutral-400">Photo</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-semibold">Profile</h2>
                <p className="text-neutral-300 max-w-2xl">
                  I create clean, minimal, and immersive interfaces. My work balances aesthetics with performance, always with a touch of motion.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.instagram.com/aarav.nextgen/"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="relative z-10">Instagram</span>
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-yellow-400/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-yellow-400/10 group-hover:to-red-500/10 transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aarav-tatiya-84a6b62a7/"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="relative z-10">LinkedIn</span>
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 via-red-500/0 to-yellow-400/0 group-hover:from-yellow-400/10 group-hover:via-red-500/10 group-hover:to-yellow-400/10 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </ParallaxContainer>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="mb-10 sm:mb-14 flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-semibold">Projects</h2>
            <p className="text-neutral-400 text-sm">Selected works with depth and motion</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <motion.a
                key={i}
                href="#"
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Glass layer and glow */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -inset-12 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(800px circle at var(--mx,50%) var(--my,50%), rgba(255,80,80,0.2), transparent 40%)' }} />
                </div>

                <div className="relative aspect-[16/10]">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/80 to-neutral-800" />
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500">Preview {i}</div>
                </div>

                <div className="relative p-5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Futuristic UI Concept #{i}</p>
                      <p className="text-xs text-neutral-400">3D hover, glassmorphism</p>
                    </div>
                    <div className="text-xs text-neutral-400">2025</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 text-center text-neutral-500">
        <div className="container mx-auto px-6 sm:px-8">
          © {new Date().getFullYear()} Aarav Tatiya — Crafted with motion and minimalism
        </div>
      </footer>
    </div>
  )
}

export default App
