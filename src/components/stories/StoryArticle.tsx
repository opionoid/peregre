
import React from 'react'
import { Icons } from 'src/assets/icons'
import { space } from 'src/assets/style'
import { IDifficulty, IImage } from 'src/interfaces'
import styled from 'styled-components'

export interface IStoryArticleProps {
  children: React.ReactNode
  title: string
  thumbnail: IImage
  publishDate: string
  updateDate?: string
  author?: string
  tags: string[]
  difficulty: IDifficulty
  time: number
  people: {
    from: number
    to: number
  }
  abstract: string
}

export const StoryArticle: React.FC<IStoryArticleProps> = (props) => {
  return (
    <StoryArticleWrapper>
      <Thumbnail src={props.thumbnail.src} alt={props.thumbnail.alt || ''} />
      <Title>{props.title}</Title>
      <Author>{props.author}</Author>
      <InfoList>
        <Info><InfoIcon src={Icons.Person} decoding="async" />{props.people.from}~{props.people.to}</Info>
        <Info><InfoIcon src={Icons.Time} decoding="async" />{props.time}H</Info>
        <Info><InfoIcon src={Icons.MaxDepth} alt="難易度" decoding="async" />{props.difficulty}</Info>
      </InfoList>
      <Abstract>{props.abstract}</Abstract>
      <hr />
      {props.children}
    </StoryArticleWrapper>
  )
}

const StoryArticleWrapper = styled.article`
margin-bottom: 9em;
  
&::before {
  content: '';
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  background-image: url('https://picsum.photos/1200/1200');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  width: 100%;
  height: 100vh;
  filter: opacity(0.07) grayscale(0.1) blur(8px) sepia(1);
}
`
const Thumbnail = styled.img`
margin-top: ${space.m};
width: 100%;
`
const Title = styled.h1`
margin-top: ${space.m};
`
const Author = styled.p`
text-align: end;
margin-right: 0.5rem;
`
const InfoList = styled.ul`
display: flex;
margin: 0 0 0 auto;
width: fit-content;
flex-wrap: wrap;
list-style: none;
`
const Info = styled.li`
display: flex;
align-items: center;
&:last-child {
  margin-right: 0.5rem;
}
&:not(:last-child) {
  margin-right: ${space.s};
}
> *:first-child {
  margin-right: ${space.xxs};
}
`
const InfoIcon = styled.img`
width: 1.625rem;
height: 1.625rem;
`
const Abstract = styled.p`
margin-top: ${space.m};
`
