const table = document.querySelectorAll('.dbclick');

for (let element of table) {
    element.addEventListener('dblclick', function () {
        element.setAttribute('contenteditable', 'true');
        element.focus();
    });

    element.addEventListener('blur', function () {
        element.removeAttribute('contenteditable');
    });
}



const img = document.querySelector('#profile');
const fille = document.querySelector('#image')

img.addEventListener('dblclick', function () {
    fille.click()

})


fille.addEventListener('change', function () {
    const file = fille.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});



const tables = document.querySelectorAll('.smalltable');

for (let table of tables) {
  
    const tds = table.querySelectorAll('td');

   
    for (let td of tds) {
       
        if (td === tds[0]) {
            td.setAttribute('contenteditable', 'false'); 
        }

       
        td.addEventListener('dblclick', function () {
            if (td !== tds[0]) { 
                td.setAttribute('contenteditable', 'true'); 
                td.focus();

               
                let ul = td.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    td.appendChild(ul); 
                }

               
                const newLi = document.createElement('li');
                newLi.textContent = ''; 
                ul.appendChild(newLi);  
                newLi.focus(); 
            }
        });

        
        td.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && td.hasAttribute('contenteditable')) {
                event.preventDefault();

                let ul = td.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    td.appendChild(ul); 
                }


                const newLi = document.createElement('li');
                newLi.textContent = '';
                ul.appendChild(newLi);  
                newLi.focus(); 
            }
        });

       
        td.addEventListener('blur', function () {
            td.removeAttribute('contenteditable');
        });

   
        td.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                td.removeAttribute('contenteditable');
            }
        });
    }
}
