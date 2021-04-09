module.exports = (componentName) => `
import React from 'react'
import styled from 'styled-components'

export interface I${componentName}Props {}

export const ${componentName}: React.VFC<I${componentName}Props> = () => {
  return (
    <${componentName}Wrapper>
    </${componentName}Wrapper>
  )
}

const ${componentName}Wrapper = styled
`;
