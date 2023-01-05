//
// WBE
// Versuche mit Events im Browser
// Vergleich mit jQuery
//

// $('header').on('click.group', function(e) {
// 	$(this).css({backgroundColor: "goldenrod"});
// });

document.querySelector('header').addEventListener('click', (e) => {
  e.currentTarget.style.backgroundColor = "goldenrod"
})


// $('header').on('click', function(e) {
// 	$(this).css({borderRadius: "15px"});
// });

document.querySelector('header').addEventListener('click', (e) => {
  e.currentTarget.style.borderRadius = "15px"
})


// $('li').on('click', function(e) {	
// 	$(this).css({backgroundColor: "mediumaquamarine"});
// });

// Array.from(document.querySelectorAll('li')).forEach((el) => el.addEventListener('click', (e) => {
//   e.currentTarget.style.backgroundColor = "mediumaquamarine"
//   e.preventDefault()
// }))


// document.querySelector('body').addEventListener('click', (e) => {
//   e.target.style.borderRadius = "15px"
//   e.preventDefault()
// })


// 	e.preventDefault();
// 	e.stopPropagation();
// 	console.log(e);
// 
// 	$(this).css({backgroundColor: "mediumaquamarine"});
// 	$(e.target).css({backgroundColor: "mediumaquamarine"});
// 	$(e.currentTarget).css({backgroundColor: "mediumaquamarine"});
// 	$(e.delegateTarget).css({backgroundColor: "mediumaquamarine"});
// 
// 	$('ul').trigger('click.group');
// 	
// 	return false


