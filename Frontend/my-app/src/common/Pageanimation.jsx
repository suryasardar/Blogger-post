import { motion } from "framer-motion";

const PageAnimation = ({ children, keyValue,className, initial = { opacity: 0 }, animate = { opacity: 1 }, transition = { duration: 1 } }) => {
    return (
        <motion.div
            key={keyValue}
            initial={initial}
            animate={animate}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default PageAnimation;