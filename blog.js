//dialog form
const popup = document.getElementById('popup');

//buttons
const addBtn = document.getElementById('addBtn');
const delAllBtn = document.getElementById('deleteAll');
const postBtn = document.getElementById('postBtn');

//inputs
const titleField = document.getElementById('title');
const dateField = document.getElementById('date');
const sumField = document.getElementById('summary');

//output
const out = document.querySelector('output');

//globals
var posts = [];
var editOn = 0;
var editInd = -1;

//set events for page load and unload
window.onload = init;
window.onbeforeunload = save;

//parse array saved on local storage and display array items
//prepopulate array if empty
//set event listeners
function init(){
  let saved = JSON.parse(localStorage.getItem('posts'));
  if(!Array.isArray(saved) || !saved.length){
    prePop();
  }else{
    posts = saved;
  }
  posts.forEach(display);
  addBtn.addEventListener('click', add);
  delAllBtn.addEventListener('click', deleteAll);
  postBtn.addEventListener('click', post);
  popup.addEventListener('close', close);
}

//prepopulate array
function prePop(){
  let entry = new blogEntry("Hello World!", "03/01/2023", "Welcome to my blog!");
  posts.push(entry);
}

//strigify and save array to local storage
function save(){
  localStorage.setItem('posts',  JSON.stringify(posts));
}

//class for blog entries
class blogEntry{
  constructor(title, date, summary){
    this.title = title;
    this.date = date;
    this.summary = summary;
  }
}

//show dialog when 'Add' button is clicked
function add(){
  popup.showModal();
  if(editOn == 1){
    titleField.value = posts[editInd].title;
    sumField.value = posts[editInd].summary;
  }
}

//push blog entry onto array when 'Post' is clicked
function post(){
  let entry = new blogEntry(titleField.value, addDate(), sumField.value);
  posts.push(entry);
}

//update and display blog posts when dialog closes
function close(){
  if(editOn == 1){
    posts[editInd] = posts[posts.length-1];
    posts.pop();

    clear();
    posts.forEach(display);

    titleField.value = "";
    sumField.value = "";

    editOn = 0;
  }else{
    clear();
    posts.forEach(display);

    titleField.value = "";
    sumField.value = "";
  }
}

//displays blog entries
function display(value, index){
  out.innerHTML += "<h3>Title: " + value.title + "</h3>" + "<span><i>" + value.date + "</i></span>" + "<p>Summary: " + value.summary + "</p>" + `<div><button onclick=\"edit(${index});\">Edit</button> <button onclick=\"del(${index});\">Delete</button></div>`;
}

//clears past blog entries from screen to prep for repainting when array is changed
function clear(){
  out.innerHTML = "";
}

//deletes all blog entries from array and screen
function deleteAll(){
  posts = [];
  out.innerText = "No blog posts available";
}

//opens dialog box when 'Edit' is clicked
function edit(index){
  editOn = 1;
  editInd = index;
  add();
}

//deletes blog entry from array and screen when 'Delete' is clicked
function del(index){
  clear();
  posts.splice(index, 1);
  posts.forEach(display);
  if(posts.length == 0){
    out.innerText = "No blog posts available";
  }
}

//helper function for setting the date of blog entries
function addDate(){
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();

  return today = month + '/' + day + '/' + year;
}