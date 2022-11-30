const form = document.querySelector("#form");
const phone_num = document.querySelector("#phone-num")
const acc_num = document.querySelector("#acc-num")
const table = document.querySelector("#table")
const clear_table = document.querySelector("#clear-table")

table.children[0].remove();

function table_render(data) {
    // console.log(table.children[0].children)
    const table_row = document.createElement('tr')
    for (let d of data) {
        let table_data = document.createElement('td')
        table_data.innerText = d
        table_row.appendChild(table_data)
    }
    console.log(table_row)
    table.appendChild(table_row)
}

clear_table.addEventListener("click" , (e) => {
    e.preventDefault();
    table.children[0].remove();
})

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register" , {
        method:'POST',
        headers:{ 'Content-type' : 'application/json' },
        body:JSON.stringify({
            phone:phone_num.value
            // accn:acc_num.value
        })
    })
    .then(res => {
         return res.json()})
    .then(data => {
        if(data[0] === true){
            // console.log(data[1])
            alert(data[1])
        } else {
            table_render(data)
        }
        // table_render(data)
    })
    .catch(err => console.log(err))
})

