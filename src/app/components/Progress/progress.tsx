import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev: any) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={"progressBarContainer"}>
            <div
                className={"progress"}
                style={{ width: `${progress}%` }}
            ></div>
            <span className={"percentage"}>{progress}%</span>
        </div>
    );
};

export default ProgressBar;
