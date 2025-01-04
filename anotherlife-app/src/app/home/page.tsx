import UploadWindow from "@/components/uploadwindow";

export default function Home(){
    return(
        <div id="homepage" className="min-h-screen flex items-center justify-center bg-win7">
            <button>Upload</button>
            <UploadWindow />
        </div>
    );
}