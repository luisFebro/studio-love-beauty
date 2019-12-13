import React, { useState } from 'react';
import ShowImgOrSkeleton from './ShowImgOrSkeleton';

export default function ImageLogo() {
    const [showSkeleton, setShowSkeleton] = useState(true);
    return (
        <div className="mr-md-5 mt-md-5">
            <ShowImgOrSkeleton
                url="admin"
                id="5db4301ed39a4e12546277a8"
                alt='logomarca studio love beauty'
                width="500px"
                height="300px"
                setStatus={setShowSkeleton}
                status={showSkeleton}
                skeletonOpt= {{
                    variant: 'rect',
                    width: 500,
                    height: 300,
                    backgroundColor: "grey",
                }}
            />
        </div>
    );
}