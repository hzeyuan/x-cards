import { useInView } from 'react-intersection-observer';
import { motion} from "framer-motion"
const LazyLoadAnimatedSection = ({ children, animation = 'fadeIn' }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust this value to control when the animation triggers
    });

    const animations = {
        fadeIn: {
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 50,
            transition: { duration: 0.5 }
        },
        slideIn: {
            x: inView ? 0 : -100,
            opacity: inView ? 1 : 0,
            transition: { duration: 0.5 }
        },
        scaleIn: {
            scale: inView ? 1 : 0.8,
            opacity: inView ? 1 : 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={animations[animation]}
        >
            {children}
        </motion.div>
    );
};


export default LazyLoadAnimatedSection;