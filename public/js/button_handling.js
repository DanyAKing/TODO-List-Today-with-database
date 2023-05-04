const editBtn = document.querySelectorAll('.edit__btn');
const currentUrl = window.location.href;

editBtn.forEach(btn => {
  btn.addEventListener('click', async () => {
    // const node = btn.parentElement.parentElement.querySelector('p');
    // node.innerText = 'dssdsdfsdfsdf';
    // console.log(currentUrl);
  });
});

if (currentUrl === 'http://127.0.0.1:3000/todolist/added') {
  const addedEditBtn = document.querySelector('.added__edit__btn');

  addedEditBtn.addEventListener('click', async () => {
    await fetch('http://127.0.0.1:3000/todolist/added/edit');
  });
}
