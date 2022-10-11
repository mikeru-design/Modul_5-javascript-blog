'use strict';

const
  optTitleListSelector = '.titles',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list';

// ---------------------------------Adding class: active-----------------------------------

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

// ---------------------------------Generating titleList-----------------------------------

function generateTitleLinks(customSelector = ''){
  console.log(customSelector);

  const titleList = document.querySelector(optTitleListSelector);

  function clearTitles () {
    titleList.innerHTML = '';
  }
  clearTitles();

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

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

// ---------------------------------Generating tagsList-----------------------------------

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagHTML = '<li><a href= "#tag-'+ tag + '"><p>'+ tag +'</p></a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsList.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }
}
generateTags();

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
  const tags = document.querySelectorAll('list-horizontal li a');

  /* START LOOP: for each link */
  for (const tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();


