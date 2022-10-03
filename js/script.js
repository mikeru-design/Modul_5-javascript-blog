'use strict'

// ---------------------------------Adding class: active-----------------------------------

function titleClickHandler (event) {
  event.preventDefault()

  const clickedElement = this
  console.log('Link was clicked!')

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active')

  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active')
  }

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post')

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active')
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement)

  clickedElement.classList.add('active')

  /* get 'href' attribute from the clicked link */
  const clickedElementHref = clickedElement.getAttribute('href')
  console.log(clickedElementHref)

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.getElementById(clickedElementHref)
  console.log(targetArticle)

  /* add class 'active' to the correct article */
  clickedElement.addEventListener('click', targetArticle.classList.add('active'))
}

// ---------------------------------Generating TitleList-----------------------------------

function generateTitleLinks (event) {
  console.log('start generateTitleLinks')

  // Getting
  const titleList = document.querySelector('.titles')

  function clearTitles () {
    console.log(titleList)
    titleList.innerHTML = ''
    // const links = document.querySelectorAll('.titles a');
    // for(let link of links){
    //   link.innerHTML = '';
    // }
  }
  clearTitles()

  let html = ''
  // let linkHTML = '';

  const articles = document.querySelectorAll('.post')
  console.log(articles)

  for (const article of articles) {
    const articleId = article.getAttribute('id')
    console.log(articleId)
    const articleTitle = article.querySelector('h3').textContent
    console.log(articleTitle)
    const linkHTML = '<li><a href="' + articleId + '"><span>' + articleTitle + '</span></a></li>'
    console.log(linkHTML)
    html = html + linkHTML
    console.log(html)
  }

  titleList.insertAdjacentHTML('beforeend', html)
  console.log(titleList)

  const links = document.querySelectorAll('.titles a')
  console.log(links)

  for (const link of links) {
    link.addEventListener('click', titleClickHandler)
  }
}

generateTitleLinks()
