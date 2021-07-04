
import React from 'react'
import styled from 'styled-components'
import { StoryListItem } from './molecules/StoryListItem'

export interface IStoryListProps {}

export const StoryList: React.VFC<IStoryListProps> = () => {
  return (
    <StoryListWrapper>
      <li>
        <StoryListItem />
      </li>
    </StoryListWrapper>
  )
}

const StoryListWrapper = styled.ul``
