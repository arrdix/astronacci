import { VideoCard } from '@/features/video/components/video-card'
import { ContentApi } from '@/services/content/api'
import { ContentEntity } from '@/services/content/entities/entities'
import { useEffect, useState } from 'react'

export function Video() {
    const [contents, setContents] = useState<ContentEntity[]>()

    const contentApi = new ContentApi()

    useEffect(() => {
        async function getData() {
            const contents = await contentApi.findAll()

            setContents(contents)
        }

        getData()
    }, [])

    return (
        <div className="flex flex-col gap-6 w-full h-full p-4 overflow-scroll">
            <h1 className="text-2xl font-bold">Astronacci Videos</h1>
            <div className="grid grid-cols-3 gap-y-8 gap-x-2">
                {contents &&
                    contents.map((content) => (
                        <VideoCard
                            key={content.id}
                            video={content.video}
                            title={content.title}
                            description={content.description}
                        />
                    ))}
            </div>
        </div>
    )
}
