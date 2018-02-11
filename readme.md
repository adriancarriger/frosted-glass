# Frosted Glass [![npm version](https://badge.fury.io/js/frosted-glass.svg)](https://badge.fury.io/js/frosted-glass)

❄️ Add a live frosted glass blur effect over any type of web content, including text.
️️

[![Build Status](https://img.shields.io/circleci/project/github/adriancarriger/frosted-glass/master.svg?maxAge=60)](https://circleci.com/gh/adriancarriger/frosted-glass)
[![Codecov](https://img.shields.io/codecov/c/github/adriancarriger/frosted-glass/master.svg?maxAge=60)](https://codecov.io/gh/adriancarriger/frosted-glass)
[![Dependency Status](https://img.shields.io/david/adriancarriger/frosted-glass/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/frosted-glass)
[![devDependency Status](https://img.shields.io/david/dev/adriancarriger/frosted-glass/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/frosted-glass?type=dev)
[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://github.com/ionic-team/stencil)

## Demo

- Try the [plunker demo](https://plnkr.co/edit/CgAaJS?p=preview)

## Install

```bash
npm install frosted-glass --save
```

## Setup

- Add a script tag in the head of your index.html

```html
<script src='node_modules/frosted-glass/dist/frostedglass.js'></script>
```

## Usage

- Add a `frosted-glass-container` element
- Add a child `frosted-glass` element that should have a blur effect applied

```html
<frosted-glass-container>
  <h1>Welcome!</h1>
  <frosted-glass>
    <div class="nav-content">Nav content</div>
  </frosted-glass>
</frosted-glass-container>
```

## License

frosted-glass is licensed under the MIT Open Source license.
For more information, see the [LICENSE](LICENSE) file in this repository.
