'use strict';

const
  optTitleListSelector = '.titles',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags';

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
  const targetArticle = document.getElementById(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
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

    const linkHTML = '<li><a href="' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('beforeend', html);

  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

// ---------------------------------generateTags-----------------------------------

// function generateTags(){

//   /* find all articles */
//   const articles = document.querySelectorAll(optArticleSelector);

//   /* START LOOP: for every article: */
//   for (const article of articles) {

//     /* find tags wrapper */
//     const tagsList = article.querySelector(optArticleTagsSelector);

//     /* make html variable with empty string */
//     let html = '';

//     /* get tags from data-tags attribute */
//     const articleTags = article.getAttribute('data-tags');

//     /* split tags into array */
//     const articleTagsArray = articleTags.split(' ');

//     /* START LOOP: for each tag */
//     for (let tag of articleTagsArray) {

//       /* generate HTML of the link */
//       const tagHTML = '<li><a href= "#tag-'+ tag + '"><p>'+ tag +'</p></a></li>';

//       /* add generated code to html variable */
//       html = html + tagHTML;

//       /* END LOOP: for each tag */
//     }

//     /* insert HTML of all the links into the tags wrapper */
//     tagsList.insertAdjacentHTML('beforeend', html);

//   /* END LOOP: for every article: */
//   }
// }

function calculateTagsParams(tags){

}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (const tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>';
      console.log(tagHTML);

      /* add generated code to html variable */
      html = html + tagHTML;
      console.log(html);

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
  console.log('tagsParams:', tagsParams);

// [NEW] create variable for all links HTML code
let allTagsHTML = '';

// [NEW] START LOOP: for each tag in allTags:
for (let tag in allTags) {

  // [NEW] generate code of a link and add it to allTagsHTML
  const tagLink = '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';

  allTagsHTML += tagLink;
  // [NEW] END LOOP: for each tag in allTags:
}
// [NEW] add html from allTagsHTML to tagList
tagListRight.insertAdjacentHTML('beforeend', allTagsHTML);
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
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.post-tags li a');

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

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    const html = '<a href= "#author-' + articleAuthor + '"><p>' + articleAuthor + '</p></a>';

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
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
}

function addClickListenersToAuthor(){
  /* find all links to tags */
  const authors = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for (const author of authors) {

    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();

// ---------------------------------generateTags-----------------------------------


