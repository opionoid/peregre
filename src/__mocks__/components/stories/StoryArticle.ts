import { IStoryArticleProps } from 'src/components/stories/StoryArticle';

const MOCK_STORY_ARTICLE_PROPS: IStoryArticleProps = {
  children: 'サンプル',
  title: 'タイトル',
  thumbnail: {
    src: 'https://picsum.photos/id/1037/400/300',
    alt: ''
  },
  publishDate: '2021年11月20日',
  author: 'ことれの',
  tags: ['和風'],
  difficulty: '標準',
  time: 4,
  people: {
    from: 2,
    to: 3
  },
  abstract: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。'
};

export default MOCK_STORY_ARTICLE_PROPS;
