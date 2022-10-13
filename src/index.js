let addToy = false;


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyFormContainer.addEventListener('submit', event => {
    event.preventDefault();
    
      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

            body: JSON.stringify({
             name: event.target.name.value,
             image: event.target.image.value,
             likes: 0,

            })
            })
            .then(response => {
              return response.json()
          })
          .then(data => renderToy(data))
        })


const toyCollectionContainerDIV = document.getElementById('toy-collection');

        function renderToy(toy) {
          let usableToys = document.createElement('div');

          usableToys.classList.add('card');

      let h2 = document.createElement('h2');

          h2.innerText = toy.name; 

          usableToys.append(h2);

      let imgTag = document.createElement('img');

          imgTag.classList.add('toy-avatar');

          imgTag.src = toy.image;

          usableToys.append(imgTag);

      let p = document.createElement('p');

          p.innerText = toy.likes;

          usableToys.append(p);

    
      const btn = document.createElement('button');
      
          btn.classList.add('like-btn');
      
          btn.setAttribute('id', toy.id);

          btn.addEventListener('click', event => {
              event.preventDefault();
      
              fetch(`http://localhost:3000/toys/${toy.id}`, {
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
      
                body: JSON.stringify({
                  'likes': toy.likes ++ 
                })
             })
             .then(event => {
                p.innerText = toy.likes ++;
             })
            })
        usableToys.append(btn);

      toyCollectionContainerDIV.appendChild(usableToys);

        }
        

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => { 
           data.forEach(eachToy => renderToy(eachToy))


        })


     
        

   
