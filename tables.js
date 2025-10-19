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



const img=document.querySelector('#profile');
const fille=document.querySelector('#image')

img.addEventListener('dblclick',function(){
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
    // Select all <td> elements inside the table
    const tds = table.querySelectorAll('td');

    // Loop through each <td> in the table
    for (let td of tds) {
        // Skip the first <td> (the label one like "Allergies" or "Medication")
        if (td === tds[0]) {
            td.setAttribute('contenteditable', 'false'); // Ensure the label is not editable
        }

        // Double-click to make the <td> editable
        td.addEventListener('dblclick', function () {
            if (td !== tds[0]) { // Only allow editing on non-label <td>
                td.setAttribute('contenteditable', 'true'); // Make the cell editable
                td.focus();

                // Create a <ul> if it doesn't exist (to hold bullet points)
                let ul = td.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    td.appendChild(ul); // Add the <ul> inside the <td>
                }

                // Automatically add the first bullet point when the user starts typing
                const newLi = document.createElement('li');
                newLi.textContent = ''; // Blank, for the user to type in
                ul.appendChild(newLi);  // Add it to the <ul>
                newLi.focus(); // Focus on the new bullet point
            }
        });

        // Add bullet points and new lines when the Enter key is pressed
        td.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && td.hasAttribute('contenteditable')) {
                event.preventDefault(); // Prevent the default Enter behavior (line break)

                let ul = td.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    td.appendChild(ul); // Add the <ul> inside the <td> if it doesn't exist
                }

               
                const newLi = document.createElement('li');
                newLi.textContent = ''; // Blank bullet point
                ul.appendChild(newLi);  // Add it to the <ul>
                newLi.focus(); // Move the cursor to the new bullet point
            }
        });

        // Exit contenteditable mode when the user clicks outside
        td.addEventListener('blur', function () {
            td.removeAttribute('contenteditable');
        });

        // Optionally, exit contenteditable mode when the Escape key is pressed
        td.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                td.removeAttribute('contenteditable');
            }
        });
    }
}
