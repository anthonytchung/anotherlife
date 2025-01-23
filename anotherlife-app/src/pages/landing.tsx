import Link from 'next/link'

export default function Landing(){
    return(
        <div className="min-h-screen flex place-items-center justify-center bg-beige">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Gradient_example.png')] bg-cover opacity-10"></div>
            
            {/* Main Content */}
            <div className="z-10 text-center">
                {/* Title */}
                <h1 className="text-lg font-bold text-gray-800 drop-shadow-lg">
                    Enter
                </h1>
                {/* <p className="text-lg md:text-xl text-gray-700 mt-4">
                Relive the charm of the 2000s. Upload your photos and transform them into timeless memories.
                </p> */}

                {/* Buttons */}
                <div className="mt-3">
                    <Link href="/auth">
                        <button>Enter</button>
                    </Link>
                    
                </div>
            </div>
        </div>
        );
}