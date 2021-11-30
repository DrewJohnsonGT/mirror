import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from 'hooks/useInterval';
import './AnimatingNumber.css';

enum Delta {
    Decrease = 'decrease',
    Increase = 'increase',
    None = '',
}

const formatForDisplay = (number: number = 0) =>
    parseFloat(Math.max(number, 0).toString()).toFixed(2).split('').reverse();

function DecimalColumn() {
    return (
        <div>
            <span>.</span>
        </div>
    );
}

function NumberColumn({ digit, delta }: { digit: string; delta: Delta }) {
    const [position, setPosition] = useState(0);
    const [animationClass, setAnimationClass] = useState('');
    const previousDigit = usePrevious(digit);
    const columnContainer = useRef<HTMLDivElement>(null);

    const setColumnToNumber = (number: string) => {
        const clientHeight = columnContainer?.current?.clientHeight || 1;
        const numberValue = parseInt(number, 10);
        setPosition(clientHeight * numberValue);
    };

    useEffect(() => setAnimationClass(delta), [digit, delta, previousDigit]);

    useEffect(() => {
        setColumnToNumber(digit);
    }, [digit]);

    return (
        <div className='ticker-column-container' ref={columnContainer}>
            <motion.div
                animate={{ y: position }}
                className={`ticker-column ${animationClass}`}
                onAnimationComplete={() => setAnimationClass('')}>
                {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
                    <div key={num} className='ticker-digit'>
                        <span>{num}</span>
                    </div>
                ))}
            </motion.div>
            <span className='number-placeholder'>0</span>
        </div>
    );
}

export const AnimatingNumber = ({ value }: { value: number }) => {
    const numArray = formatForDisplay(value);
    const previousNumber = usePrevious(value) || 0;

    const delta =
        value === previousNumber
            ? Delta.None
            : value > previousNumber
            ? Delta.Increase
            : Delta.Decrease;

    return (
        <motion.div layout className='ticker-view'>
            {numArray.map((number, index) =>
                number === '.' ? (
                    <DecimalColumn key={index} />
                ) : (
                    <NumberColumn key={index} digit={number} delta={delta} />
                )
            )}
        </motion.div>
    );
};
