let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discounts = document.getElementById('discounts');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');

mood = 'create';
let tmp;

//calc total
function getTotal(){
    if(price.value != ''){
        let result = +price.value + +taxes.value + +ads.value;
        if(discounts.value != '' && discounts.value > 0 && discounts.value < 100){
            result -= (result * +discounts.value) / 100;
        }
        
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a80101';
    }
}

//create product
let proData;
if(localStorage.product != null){
    proData = JSON.parse(localStorage.product);
}
else{
    proData = [];
}

submit.onclick = function(){
    let newPro = {
        N_title: title.value.toLocaleLowerCase(),
        N_price: price.value,
        N_taxes: taxes.value,
        N_ads: ads.value,
        N_discounts: discounts.value,
        N_total: total.innerHTML,
        N_count: count.value,
        N_category: category.value.toLocaleLowerCase(),
    }
    //count
    if(newPro.N_title.value != '' && newPro.N_price.value != '' && newPro.N_category.value != '' && newPro.N_count >= 0){
        if(mood == 'create'){
            if(newPro.N_count == '' || newPro.N_count < 0){
                window.alert(`cant create ${newPro.N_count} items`);
            }
            else{
                for(let i = 0 ; i < newPro.N_count ; i++){
                    proData.push(newPro);
                }
            }
        }
        else if(mood == 'update'){
            proData[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'; 
        }
        cleardata();
    }
     
//save to local storage
    localStorage.setItem('product', JSON.stringify(proData));
    showdata();
}

//clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discounts.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function showdata(){
    getTotal();
    let table = '';
    for(let i = 0 ; i < proData.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${proData[i].N_title}</td>
            <td>${proData[i].N_price}</td>
            <td>${proData[i].N_taxes}</td>
            <td>${proData[i].N_ads}</td>
            <td>${proData[i].N_discounts}</td>
            <td>${proData[i].N_total}</td>
            <td>${proData[i].N_category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let BTNdelete = document.getElementById('delete_all');
    if(proData.length > 0){
        BTNdelete.innerHTML = `
            <button onclick = "deleteall()" id="delete">delete ALL(${proData.length})</button>
        `;
    }
    else{
        BTNdelete.innerHTML = '';
    }
}
showdata();

//delete
function deletedata(i){
    proData.splice(i, 1);
    localStorage.product = JSON.stringify(proData);
    showdata();
}

//delete all
function deleteall(){
    localStorage.clear();
    proData.splice(0);
    showdata();
}

//update
function updatedata(i){
    title.value = proData[i].N_title;
    price.value = proData[i].N_price;
    taxes.value = proData[i].N_taxes;
    ads.value = proData[i].N_ads;
    discounts.value = proData[i].N_discounts;
    category.value = proData[i].N_category;
    count.style.display = 'none';
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top : 0,
        behavior : 'smooth'
    });
}

//search
let search_mood = "title";
function searchmood(id){
    let search = document.getElementById('search');
    search.focus();
    if(id == "search_title"){
        search_mood = "title";
    }
    else if(id == "search_category"){
        search_mood = 'category';
    }
    search.placeholder = 'search by ' + search_mood;
    search.value = '';
    showdata();
}

function searchdata(value = 'test'){
    value.toLocaleLowerCase();
    let table = '';
    let test = [];
    for(let i = 0 ; i < proData.length ; i++){
        if(search_mood == "title"){
            for(let j = 0 ; j < proData.length ; j++){
                test[j] = proData[j].N_title;
            }
        }
        else if(search_mood == "category"){
            for(let j = 0 ; j < proData.length ; j++){
                test[j] = proData[j].N_category;
            }
        }
        if(test[i].includes(value)){
            table += `
                <tr>
                <td>${i+1}</td>
                <td>${proData[i].N_title}</td>
                <td>${proData[i].N_price}</td>
                <td>${proData[i].N_taxes}</td>
                <td>${proData[i].N_ads}</td>
                <td>${proData[i].N_discounts}</td>
                <td>${proData[i].N_total}</td>
                <td>${proData[i].N_category}</td>
                <td><button onclick = "updatedata(${i})" id="update">update</button></td>
                <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//scroll
let scrol = document.getElementById('scrol');
onscroll = function(){
    if(scrollY >= 400){
        scrol.style.display = 'block';
    }
    else{
        scrol.style.display = 'none';
    }
}
scrol.onclick = function(){
    scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
}