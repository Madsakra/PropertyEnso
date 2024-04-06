import {motion} from 'framer-motion';


const transition = (OgComponent) => {
    return ()=>(
        <>
        <OgComponent/>
        <motion.div
            className='slide-in'
            initial={{scaleY:0}}
            animate={{scaleY:0}}
            exit={{scaleY:4}}
            transition={{duration:2, ease:[0.22,1,0.36,1]}}
        />

        <motion.div
            className='slide-out'
            initial={{scaleY:4}}
            animate={{scaleY:0}}
            exit={{scaleY:0}}
            transition={{duration:2, ease:[0.22,1,0.36,1]}}
        />

        </>
    );
};


export default transition;