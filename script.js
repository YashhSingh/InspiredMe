const search_btn = document.querySelector('.mag')
const searchbar = document.querySelector('.searchbar')
const searched_Ul = document.querySelector('.searched_item_list')

//"https://type.fit/api/quotes"

class quote_search {
    constructor() {
        search_btn.addEventListener('click', this._search_func.bind(this))
    }
    //html to render
    _html_string(data_passed) {
        let html = data_passed.map(element => {
            return `  <li class="searched_item">
        <p>${element.text}<br><br>
           -${element.author}</p>
                   </li>`
        }).join(' ');
        searched_Ul.insertAdjacentHTML('beforeend', html)
    }
    
    //main search and display function
    async _search_func() {
        try {
            const searched_item = searchbar.value;
            const data = await fetch('https:type.fit/api/quotes');
            if (!data.ok) {
                throw new Error(data.json())
            }
            const data2 = await data.json()
            console.log(data2);

            const newdata = data2.map(el => {
                return {
                    "Author": el.author,
                    "Text": el.text
                }
            })
            console.log(newdata);
            const filteredAns = newdata.filter(el => {
                return el.Author === searched_item
            })
            console.log(filteredAns);
            this._html_string(filteredAns)
        } catch (err) {
            console.log(err);
        }
    }
}

const search_it = new quote_search();
