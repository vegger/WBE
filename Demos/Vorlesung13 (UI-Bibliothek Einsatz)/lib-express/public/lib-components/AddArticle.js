/**
 *  Component to render the UI for adding articles
 * 
 *  Everything belonging to the component (helper functions, styles, ...)
 *  should be in this file
 */ 

const AddArticle = ({name, title, summary, 
  onChangeTitle, onChangeSummary, onClickAdd}) => (
  ["section", 
    ["h1", name],
    ["input", {placeholder: "Title", value: title, oninput: onChangeTitle}],
    ["input", {placeholder: "Summary", value: summary, oninput: onChangeSummary}],
    ["button", {onclick: onClickAdd}, "Add"] ]
)

export { AddArticle }