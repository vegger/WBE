/**
 *  Component to render an ArticleList
 * 
 *  Everything belonging to the component (helper functions, styles, ...)
 *  should be in this file
 */ 

import { ArticleItem } from "./ArticleItem.js"


const ArticleList = ({articles, onClickToggle, onClickRemove}) => (
  ["ul", ...articles.map(i => (
    [ArticleItem, {
      key: i.id,
      article: i,
      onClickToggle,
      onClickRemove} ]))]
)

export { ArticleList }
