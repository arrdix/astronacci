import { Button } from '@/components/ui/button'

interface ArticleCardProps {
    image: string
    title: string
    content: string
}

export function ArticleCard({ image, title, content }: ArticleCardProps) {
    return (
        <div className="flex flex-col gap-2 shadow-lg rounded-lg">
            <img className="rounded-lg" src={image} alt="article image" />
            <div className="flex flex-col gap-1 px-4">
                <h2 className="text-2xl font-bold leading-2">{title}</h2>
                <p className="text-sm text-justify">{content}</p>
                <Button className="w-1/2 ml-auto my-4">Read More</Button>
            </div>
        </div>
    )
}
