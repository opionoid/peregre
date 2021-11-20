import { IStoryArticleProps, StoryArticle } from "src/components/stories/StoryArticle"

const info: Omit<IStoryArticleProps, 'children'> = {
  title: '暗狐行燈物語',
  thumbnail: { src: '', alt: '' },
  publishDate: '2021年11月21日',
  people: { from: 2, to: 3 },
  time: 4,
  difficulty: '標準',
  tags: ['和風'],
  abstract: '',
}

const content = <>
  <p>
    てすとです
  </p>
</>

export const Story = <StoryArticle {...info}>{content}</StoryArticle>