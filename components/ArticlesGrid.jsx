import { AppGrid } from './AppGrid';
import { ArticleCard } from './ArticleCard';

export function ArticlesGrid({ articles }) {
  return (
    <AppGrid>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          description={article.description}
          slug={article.slug}
          image={article.image}
          publishedAt={article.publishedAt}
        />
      ))}
    </AppGrid>
  );
}
