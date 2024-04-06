//count
if(newPro.N_title.value != '' && newPro.N_price.value != '' && newPro.N_category.value != '' && newPro.N_count >= 0){
    if(newPro.N_count == '' || newPro.N_count < 0){
        window.alert(`cant create ${newPro.N_count} items`);
    }
    if(mood == 'create'){
        for(let i = 0 ; i < newPro.N_count ; i++){
            proData.push(newPro);
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


//calc total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) + +discounts.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a80101';
    }
}


//search
if(search_mood == "title"){
    if(proData[i].N_title.includes(value)){
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
else if(search_mood == "category"){
    if(proData[i].N_category.includes(value)){
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