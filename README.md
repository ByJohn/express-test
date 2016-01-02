# Node.js & Express Test Project

A simple blog/website practice project powered by [Node](https://nodejs.org) and the [Express framework](http://expressjs.com/).

I created this project to try out [Node](https://nodejs.org) and the [Express framework](http://expressjs.com/). I also dipped my toes into [Jade](http://jade-lang.com/), the templating engine, [Gulp](http://gulpjs.com/), the JavaScript task runner and [Sass](http://sass-lang.com/), the CSS preprocessor. Created over two days during the Christmas holidays. Development was a very nice experience overall and I thought I would release the project for my future reference and for anyone looking for a simple example of an Express project.

## Notable Features

### Flat-file blog post archive

**File**: posts.js

Each blog post is stored as an individual file in the "posts" folder. They are Markdown files with filenames that follow a specific pattern: "YYYY-MM-DD-name-of-post.md" (inspired by [Jekyll](http://jekyllrb.com/docs/posts/#creating-post-files)). The "YYYY-MM-DD" part of the filename is used for the publish date and the "name-of-post" part is used as the post's slug (friendly url/permalink).

## Potential Improvements

* Cater for the case when no posts are available
* Display the posts' excerpt of the content on the home page (post archive)
* Instead of normal pages (for example, currently the Sample Page (views/page-sample.jade)) being standalone template files, use a system similar to posts, by designating a "pages" folder containing Markdown files. These pages could also automatically feed into the site navigation menu

## How to Run (locally)

#### 1. Install [Git](https://git-scm.com/) and [Node](https://nodejs.org)

* Git: https://git-scm.com/
* Node: https://nodejs.org

#### 2. Install [Gulp](http://gulpjs.com/) globally

```
npm install --global gulp
```

#### 3. Clone the repo

```
git clone https://github.com/ByJohn/express-test.git
```

#### 4. Enter the repo

```
cd express-test
```

#### 5. Install the dependencies

```
npm install
```

#### 6. Build the css and start the server

```
gulp
```

#### 7. View the website in your browser

Go to http://localhost:4004/
