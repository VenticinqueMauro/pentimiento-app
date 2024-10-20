import { motion } from 'framer-motion';

const TextEffect = ({ text }: { text: string }) => {

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            y: "100%",
        },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
            style={{
                display: 'flex',
                overflow: 'hidden',
                fontSize: '2em',
                fontWeight: '500',
                padding: '0 1rem'
            }}            >
            {text.split("").map((letter, index) => (
                <motion.span key={index} variants={child} className='text-4xl lg:text-7xl  font-sans tracking-widest'>
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextEffect;
