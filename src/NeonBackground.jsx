import { motion } from 'framer-motion'

export default function NeonBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

      {/* Animated neon blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,70,70,0.45), transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -10, 20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-24 -right-24 h-[38rem] w-[38rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 70% 70%, rgba(255,200,40,0.35), transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -20, 10, 0],
          y: [0, 15, -15, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  )
}
