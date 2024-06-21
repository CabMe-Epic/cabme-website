import React from 'react';

const Video: React.FC = () => {
    return (
        <div className='px-4'>
        <div className="mx-auto p-6 bg-white rounded-lg shadow-md max-w-[1250px] border">
            <h2 className="text-2xl font-bold mb-4 border-b-[1px] pb-4 border-grey-100">Video</h2>
            <div className='m-auto flex flex-row justify-center items-center'>
                <iframe
                    width="760"
                    height="515"
                    src="https://www.youtube.com/embed/erhORDnwJeQ?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&si=gFoZ1pe6pgaskuJj"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className='h-auto'
                    
                ></iframe>
            </div>
            </div>
        </div>
    );
}

export default Video;
