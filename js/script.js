'use strict';

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

/* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.post');

for(let activeArticle of activeArticles){
activeArticle.classList.remove('active');
}

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.addEventListener('click', clickedElement.classList.add('active'));

  /* get 'href' attribute from the clicked link */

  let clickedElementHref = clickedElement.getAttribute("href");
  console.log(clickedElementHref);
  
  /* find the correct article using the selector (value of 'href' attribute) */
  
  let targetArticle = document.querySelector(clickedElementHref);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  clickedElement.addEventListener('click', targetArticle.classList.add('active'));
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}