interface VideoCardProps {
    video: string
    title: string
    description: string
}

export function VideoCard({ video, title, description }: VideoCardProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {/* <video className="w-full h-52" controls>
                <source src="https://youtu.be/C6bxAncDclM?si=PqlOU7hh-Vlp82ks" type="video/mp4" />
            </video> */}
            <iframe
                className="w-full h-52 rounded-lg"
                src={video}
                title="Free Stock Footage / Bitcoin Falling"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <div className="flex-flex-col">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}
