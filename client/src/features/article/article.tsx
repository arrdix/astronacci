import { ArticleCard } from '@/features/article/components/article-card'
import { ArticleApi } from '@/services/article/api'
import { ArticleEntity } from '@/services/article/entities/entities'
import { useEffect, useState } from 'react'

export function Article() {
    const [articles, setArticles] = useState<ArticleEntity[]>()

    const articleApi = new ArticleApi()

    useEffect(() => {
        async function getData() {
            const articles = await articleApi.findAll()

            setArticles(articles)
        }

        getData()
    }, [])

    return (
        <div className="flex flex-col gap-6 w-full h-full p-4 overflow-scroll">
            <h1 className="text-2xl font-bold">Astronacci Articles</h1>
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                {articles &&
                    articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            image={article.image}
                            content={article.content}
                            title={article.title}
                        />
                    ))}
            </div>
        </div>
    )
}
