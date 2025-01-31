import { motion } from "motion/react";

const Loading = () => {
    return (
        <main className="h-[calc(100vh-48px)] flex flex-col items-center justify-center">
            <motion.div
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-3 h-3 bg-text-contrast rounded-full"
                />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.2
                    }}
                    className="w-3 h-3 mx-2 bg-text-contrast rounded-full"
                />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.4
                    }}
                    className="w-3 h-3 bg-text-contrast rounded-full"
                />
            </motion.div>
            <motion.div className="mt-4 font-bold">
                Нужно немного подождать
            </motion.div>
        </main>
    );
};

export default Loading;
