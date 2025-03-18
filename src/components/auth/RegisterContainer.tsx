import { IswoIconLarge } from '@/icons'
import { motion } from 'framer-motion'
import RegisterFormContainer from './RegisterFormContainer'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}


const RegisterContainer = () => {
  return (
    <section className="min-h-screen w-full max-w-[1440px] flex flex-col lg:flex-row lg:items-start lg:px-8 mt-36">
      <motion.div
        className="flex flex-col items-center lg:w-1/2 px-6 lg:mt-32"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1.6 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className="mb-10 cursor-pointer"
            whileHover={{
              scale: 1.1,
            }}
          >
            <IswoIconLarge className="size-24 dark:invert lg:size-32" />
          </motion.div>
        </motion.div>
        <h2 className="text-center text-4xl font-extrabold">
          ¡Bienvenido a ISWO academy!
        </h2>
        <p className="mt-8 hidden lg:flex text-center text-xl font-semibold text-muted-foreground dark:text-muted">
          Te brindaremos la mejor experiencia para que aprendas y enseñes en
          internet
        </p>
      </motion.div>
      <RegisterFormContainer />
    </section>
  )
}

export default RegisterContainer