import React from 'react'
import { useParams } from "react-router"

type Id = {
  id: string
}

export const StoryPage: React.FC = () => {
  const { id } = useParams<Id>()
  const [story, setStory] = React.useState<JSX.Element>()
  import(`src/data/stories/${id}/index.tsx`).then(data => setStory(data.Story))

  return (
    story ? story : <p>読み込み中</p>
  )
}
