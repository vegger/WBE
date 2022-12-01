/*
 * Progress Bar Demo
 */ 

window.onload = () => {
  document.querySelector('p:nth-child(1) custom-progress-bar').progress = 75;
  document.querySelector('p:nth-child(2) custom-progress-bar');
  
  var pb = document.querySelector('p:nth-child(3) custom-progress-bar');
  setInterval(() => changePb(pb), 20);
}

const changePb = (pb) => {
  if (Math.random()>0.85) {
    pb.progress = (parseInt(pb.progress)+1) % 101;
  }
}
