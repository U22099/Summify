export default function addSwipeEventListener(leftSwipeAction, rightSwipeAction){
  
  let startX = 0;

  document.body.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  document.body.addEventListener('touchend', (event) =>  {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) { 
      leftSwipeAction();
    } else if(deltaX < -50){
      rightSwipeAction();
    }
});

}