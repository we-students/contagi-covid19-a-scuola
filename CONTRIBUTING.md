# Contributing instructions

Thank you for considering making a contribution to this repository. In this file, you will find guidelines for contributing efficiently

# Architecture

This section describes the project's architecture. Please read it thoroughly before contributing to the project.

The webapp is written using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) ES6. The project was boostrapped using [create-react-app](https://github.com/facebook/create-react-app). The build process is handled by create-react-app's react-scripts. The dependency management is handled by [NPM](https://www.npmjs.com/).

## Repository structure

The folder stucter of the webapp is grouped by concerns. In particular:

-   **pages**. This contains the pages.
-   **components**. This contains the components.
-   **utils**. This contains all kind of utils needed, used accross the app.
    -   **data**. This contains the data fetching helpers.

## Code style

The source code is linted by Eslint and enforced by Prettier. All the code pushed to the repo, in every branch, must be compliant to the code style config.

# Gitflow

This repository adopts a branch management system inspired by [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

The main branches are as follows:

-   **Master**. The _master branch_ contains the codebase that has reached the production environment. Commits are manually merged in this branch by project maintainers.
-   **Development**. The _development branch_ is where development takes place. This branch serves as an integration branch for features and fixes—it.

## Feature and fixes

When contributors wish to implement a new feature or a fix, they should branch from the development branch and open a pull request. Branches should have a meaningful name that adheres to the following convention:

```
<type>/name_of_feature_or_fix.
```

The _type_ prefix should be one of the following:

-   **feature**. Used in the case that the branch implements a new feature.
-   **fix**. Used in the case that the branch implements a fix.

Valid branch names are:

-   _feature/onboarding_
-   _fix/paddings_

Invalid branch names are:

-   _feat/onboarding_
-   _fix_paddings_

# Commits

Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) naming convention for consistency

# How to contribute

When you encounter a bug or an issue with the system represented in this repository, you may choose to let the developers know the nature of the issue.

### Creating a new issue

When creating a new issue, there are three categories:

-   Bug report
-   Webapp feature request
-   General issue

Please ensure that you select the appropriate category for the issue

## Pull requests

After opening an issue, you may want to help the developers further, you may propose a solution. Doing so is always appreciated. For this, please use the Pull Request tool.

When creating a pull request, please choose a name that adheres to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) naming convention. It is important to review and follow this convention before creating a pull request. This ensures that the commit history remains clean and makes it easy to identify what each commit does.
