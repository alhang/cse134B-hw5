//get form fields and output field
const artForm = document.getElementById('artForm')
const artId = document.getElementById('artId');
const artName = document.getElementById('article_name');
const artBody = document.getElementById('article_body');
const date = document.getElementById('date');
const out = document.getElementById("response");

//get buttons
const postBtn = document.getElementById('postBtn');
const getBtn = document.getElementById('getBtn');
const putBtn = document.getElementById('putBtn');
const deleteBtn = document.getElementById('deleteBtn');

//set up event listeners
postBtn.addEventListener('click', postData);
getBtn.addEventListener('click', getData);
putBtn.addEventListener('click', putData);
deleteBtn.addEventListener('click', deleteData);

//get current date and set date field
function getDate(){
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    date.value = month + '/' + day + '/' + year;
}

//formats and outputs POST, PUT, DELETE request responses
function handlePost(e) {
    let resp = e.target;
    
    out.innerHTML = '<h2>'+JSON.parse(resp.responseText).form.article_name+'</h2>'
    +'<h3><i>'+JSON.parse(resp.responseText).form.date+'</i></h3>'
    +'<p>'+JSON.parse(resp.responseText).form.article_body+'</p>'
    +'<p><i>'+JSON.parse(resp.responseText).form.id+'<i></p>';

}

//formats and outputs GET request responses
function handleGet(e) {
    let resp = e.target;
    
    out.innerHTML = '<h2>'+JSON.parse(resp.responseText).args.article_name+'</h2>'
    +'<h3><i>'+JSON.parse(resp.responseText).args.date+'</i></h3>'
    +'<p>'+JSON.parse(resp.responseText).args.article_body+'</p>'
    +'<p><i>'+JSON.parse(resp.responseText).args.id+'<i></p>';

}

//send POST http request
function postData(e) {
    getDate();
    e.preventDefault();
    let formData = new FormData(artForm);
    let data = new URLSearchParams(formData).toString();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://httpbin.org/post');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
    xhr.addEventListener("load", handlePost);
    xhr.send(data);
}

//send GET http request
function getData(e) {
    getDate();
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://httpbin.org/get?id=${artId.value}&article_name=${artName.value}&article_body=${artBody.value}&date=${date.value}`);

    xhr.addEventListener("load", handleGet);
    xhr.send();
}

//send PUT http request
function putData(e) {
    getDate();
    e.preventDefault();
    let formData = new FormData(artForm);
    let data = new URLSearchParams(formData).toString();

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://httpbin.org/put');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
    xhr.addEventListener("load", handlePost);
    xhr.send(data);
}

//send DELETE http request
function deleteData(e) {
    getDate();
    e.preventDefault();
    let formData = new FormData(artForm);
    let data = new URLSearchParams(formData).toString();

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://httpbin.org/delete');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
    xhr.addEventListener("load", handlePost);
    xhr.send(data);
}

//export {getDate, handlePost, handleGet, postData, getData, putData, deleteData};