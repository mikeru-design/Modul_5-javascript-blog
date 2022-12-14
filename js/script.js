'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListRight: Handlebars.compile(document.querySelector('#template-author-right-link').innerHTML),
};

const
  optArticleSelector = '.post',
  optTitleListSelector = '.titles',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

// ---------------------------------resetAllClickHandler-----------------------------------

function resetAllClickHandler(){
  const allClassActive = document.querySelectorAll('.post.active');
  console.log(allClassActive);

  for (const classActive of allClassActive) {
    classActive.classList.remove('active');
    generateTitleLinks();
  }
}

// ---------------------------------resetAll-----------------------------------

function resetAll(){
  const resetBtn = document.querySelector('.resetBtn');
  console.log(resetBtn);

  resetBtn.addEventListener('click', resetAllClickHandler);
}
resetAll();

// ---------------------------------titleClickHandler-----------------------------------

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (const activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (const activeTag of activeTags) {
    activeTag.classList.remove('active');
  }
}

// ---------------------------------generateTitleLinks-----------------------------------

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);

  function clearTitles () {
    titleList.innerHTML = '';
  }
  clearTitles();

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (const article of articles) {

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);


    html += linkHTML;
  }

  titleList.insertAdjacentHTML('beforeend', html);

  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

// ---------------------------------calculateTagsParams-----------------------------------

function calculateTagsParams(tags){
  const params = {max:0, min:999999};

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

// ---------------------------------calculateTagClass-----------------------------------

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount/ normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1);

  return (optCloudClassPrefix + classNumber);
}

// ---------------------------------generateTags-----------------------------------

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (const tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTMLData = {id: 'tag-'+ tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* add generated code to html variable */
      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagList.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagListRight = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  // [NEW] create variable for all links HTML code
  const allTagsData = {tags: []};

  // [NEW] START LOOP: for each tag in allTags:
  for (let tag in allTags) {

    // [NEW] generate code of a link and add it to allTagsData
    allTagsData.tags.push({
      tag: tag,
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    // [NEW] END LOOP: for each tag in allTags:
  }

  // [NEW] add html from allTagsData to tagList
  tagListRight.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

// ---------------------------------tagClickHandler-----------------------------------

function tagClickHandler(event){
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for ( const tagLinkHref of tagLinksHref) {

    /* add class active */
    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (const activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.post-tags li a, .list.tags a');

  /* START LOOP: for each link */
  for (const tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// ---------------------------------generateAuthor-----------------------------------


function generateAuthor(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* find authors list in right column */
  const authorsListRight = document.querySelector(optAuthorsListSelector);

  let allAuthors = {};

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    // const html = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
    const linkHTMLData = {id: 'author-' + author, title: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', linkHTML);

    if(!allAuthors.hasOwnProperty(author)){
      /* [NEW] add generated code to allTags array */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* END LOOP: for every article: */
  }

  const allAuthorsData = {authors: []};

  // [NEW] START LOOP: for each tag in allTags:
  for (let author in allAuthors) {

    // [NEW] generate code of a link and add it to allTagsHTML
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });

    authorsListRight.innerHTML = templates.authorsListRight(allAuthorsData);
  }

}
generateAuthor();

// ---------------------------------authorClickHandler-----------------------------------

function authorClickHandler(event){
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  // /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  // /* find all authors links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);

  /* START LOOP: for each active author link */
  for (const activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorsHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for ( const authorHref of allAuthorsHref) {

    /* add class active */
    authorHref.classList.add('active');

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (const activeTag of activeTags) {
    activeTag.classList.remove('active');
  }
}

function addClickListenersToAuthor(){
  /* find all links to tags */
  const authors = document.querySelectorAll('.post-author a, .list.authors a');

  /* START LOOP: for each link */
  for (const author of authors) {

    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }

}
addClickListenersToAuthor();

