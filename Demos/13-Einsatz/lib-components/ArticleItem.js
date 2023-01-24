/**
 *  Component to render an ArticleItem
 * 
 *  Everything belonging to the component (helper functions, styles, ...)
 *  should be in this file
 */ 

const ArticleItem = ({article, onClickToggle, onClickRemove}) => (
  ["li",
    ["a", { href: '#', title: "Toggle Summary", 
      onclick: onClickToggle.bind(null, article.id) }, 
      article.title ], 
    " ",
    ["a", { href: '#', title: "Remove", 
      onclick: onClickRemove.bind(null, article.id) }, 
      "✗" ],
    ["p", {style: {display: article.display}}, 
      article.summary] ]
)

export { ArticleItem }
