# Mesa Contribution Guideline

# Abstract

Mesa is an open-source project, including but not limited to the Front End interface and Solidity Smart Contracts. As such, a Contribution Guideline shall facilitate the foundation for a collaborative ground for every contributor working on Mesa codebase(s).

# Style Project Structure

At Mesa, we are using React to build the frontend. Our current code structure looks like.

## General Components

A General Component is a React Component that is primitive. A General Component should come with bare minimum styles and configurations. It, however, can be extended as per view/page requirements.

1. Directory `src/components`
2. Component `src/components/<ComponentName>/index.tsx`
3. Unit tests `src/components/<ComponentName>/index.spec.tsx`
4. styled-components functions must be stored in the same file

## Views

A View is a single page. Each View in the system serves one purpose.

View-Specific Components

## View Components

To implement [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) in Views, A View can store its Components in within the same directory

1. Directory `src/views/<ViewName>/components`
2. Component `src/views<ViewName>/components/<ComponentName>/index.tsx`
3. Each Component has its own directory and a `index.tsx` that exports the Component

## Layouts

Layouts can be used to bootstrap a View while maintaining a unity among.

1. Directory `src/layouts`
2. Layout `src/layouts/<LayoutName>/index.tsx`
3. Unit Tests `src/layouts/<LayoutName>/index.spec.tsx`

## React Hooks

Mesa uses React 17.

1. Directory `src/hooks`
2. Layout `src/hooks/use<HookName>.tsx`
3. Unit Tests `src/hooks/use<HookName>.spec.tsx`

## Assets

1. Directory `src/assets`
2. Images in `/src/assets/images`
3. Videos in `src/assets/videos`
4. SVG in `src/assets/svg`

## Redux

1. Directory `src/redux`
2. Store in `src/redux/store.ts`
3. Ducks in `src/redux/<DuckName>.ts`

## Styles

1. Directory `src/styles`
2. Theme in `src/styles/themes.ts`
3. Global Style (from styled-components) in `src/Global.tsx`
4. Google fonts in `src/styles.fonts.css`

## Interfaces

TypeScript interfaces that are used in more than one place should be stored here.

# Coding Standards

At DXdao, everyone thrives to write high-quality code. And such as every Worker should follow the _best practices_ to achieve their goals.

## Code Indentation

Use two space to intend code. Lint code using Prettier. Configurations are stored in `.prettierrc` IDE of choice should be able to format file upon saving file.

## No Default Export

Except for external modules, all internal files must avoid default exports in ES6.

**Good**

```jsx
// GoodExport.ts
export function GoodExport() {
  return 'I am exported using export'
}

// index.ts
import { GoodExport } from './GoodExport.ts'
```

**Bad**

```jsx
// NoSoGoodExport.ts
export function NoSoGoodExport() {
  return 'I am exported using export'
}

// index.ts
import VeryGoodExport from './NoSoGoodExport.ts'
```

As you can see, with the second example, the imported name can be dynamic. Please avoid this.

## Group Imports

Imports should be grouped by category:

1. External imports
   1. functions, objects, interfaces, classes
2. Interfaces: imports from `src/interfaces`
3. Components
4. Layouts: layouts defined in `src/layouts`
5. Hooks: React Hooks defined in `src/hooks`
6. Helper/Util functions

**Good**

```jsx
// Externals
import React from 'react'

// Components
import { Container } from 'src/components/Containers/Container'
import { CardBody } from 'src/components/Cards/CardBody'
import { Card } from 'src/components/Card'

// Layouts
import { Center } from 'src/layouts/Center'

export function IndexView() {
  return (
    <Center minHeight="100%">
      <Container>
        <Card>
          <CardBody>Hello world</CardBody>
        </Card>
      </Container>
    </Center>
  )
}
```

## Naming Convention

### React Components

Use `TitleCase` for Components.

### Functions/Variables

Use `camelCase` for variables and functions

### Constants

Use `CAPITAL_CASE` for constants.

# Tests

The code base uses [Jest](https://jestjs.io/)

Each Component/function/file must be accompanied with approriate tests.

# Git Branches

Avoid working on the `main` branch unless absolutely necessary. Branch names should be named after what they do.

## Branch name

Please refer to [Phil Hord's answer on Stack Overflow](https://stackoverflow.com/a/6065944/2151050).
