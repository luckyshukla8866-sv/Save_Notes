"use client";

import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.12,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function SectionReveal({ children, className = "", style = {}, delay = 0 }) {
    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
                ...variants,
                visible: {
                    ...variants.visible,
                    transition: {
                        ...variants.visible.transition,
                        delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export { childVariants };
