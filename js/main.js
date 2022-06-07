
document.querySelector('button').addEventListener('click', getData)


// function getFetch(){
//   const word = document.querySelector('input').value
//   const url = `https://owlbot.info/api/v4/dictionary/${word}`

//   // fetch(url)
//   //     .then(res => res.json()) // parse response as JSON
//   //     .then(data => {
//   //       //set key 'books' to local storage if there is nothing in local storage
//   //       if (!localStorage.getItem('books')) {
//   //         localStorage.setItem('books', data.title);
//   //       } else {
//   //         //concatenate exisitng books in local storage with new book 
//   //         let books = localStorage.getItem('books') + ' ; ' + data.title;

//   //         //update local storage to include existing book and new book
//   //         localStorage.setItem('books', books);

        
         
//   //       }
//   //         //set new collection to the DOM
//   //       document.querySelector('h2').innerText = localStorage.getItem('books');
        
//   //     })
//   //     .catch(err => console.log(err))

//       fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authentication': 'Token 203b856643c07ec9c95183122553a5a6bcfb975b',
//         }
//       })
//       .then(response => response.json())
//       .then((data) => console.log(data))
//       .catch(error => console.error(error));
// }


document.querySelector('button').addEventListener('click', getData);
checkDictionary(); 

function checkDictionary() {
  if (!localStorage.getItem('dictionary')) {
    return
  } else {
    let myDictionary = document.querySelector('#myDictionary');
    let split = localStorage.getItem('dictionary').split(' ; '); //what about the first word in local storage, split throws error
    for (let i = 0; i < split.length; i++) {
    myDictionary.appendChild(document.createElement('p')).className= `myDictionary myDictionary-${i}`;
    document.querySelector(`.myDictionary-${i}`).innerText = split[i];
    }
  }
}

document.querySelectorAll('.myDictionary').forEach(word => word.addEventListener('click', fetchHistory));
function fetchHistory(event) {
  
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Token 203b856643c07ec9c95183122553a5a6bcfb975b");
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // let word = document.querySelector('.myDictionary').value;
  let word = event.currentTarget.outerText;
  let url = `https://owlbot.info/api/v4/dictionary/${word}`

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}



function getData() {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Token 203b856643c07ec9c95183122553a5a6bcfb975b");
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let word = document.querySelector('input').value;
  let url = `https://owlbot.info/api/v4/dictionary/${word}`
  
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // remove child nodes first
      let result = document.getElementById('result');
      while (result.firstChild) {
        result.removeChild(result.firstChild)
      };

      if (data.definitions.length == 1) {

        if (data.definitions[0].image_url) {
          result.appendChild(document.createElement('img'));
          document.querySelector('img').src = data.definitions[0].image_url;
        } 

        result.appendChild(document.createElement('h3')).className='type';
        document.querySelector('.type').innerText = data.definitions[0].type;

        result.appendChild(document.createElement('p')).className='def';
        document.querySelector('.def').innerText = data.definitions[0].definition;

        result.appendChild(document.createElement('p')).className='ex';
        document.querySelector('.ex').innerText = data.definitions[0].example;


      } else {
        for (let i = 0; i < data.definitions.length; i++) {
          // console.log(data.definitions[i].type);

          result.appendChild(document.createElement('h3')).className=`type type-${i}`;
          document.querySelector(`.type-${i}`).innerText = data.definitions[i].type;
  
          result.appendChild(document.createElement('p')).className=`def def-${i}`;
          document.querySelector(`.def-${i}`).innerText = data.definitions[i].definition;
  
          result.appendChild(document.createElement('p')).className=`ex ex-${i}`;
          document.querySelector(`.ex-${i}`).innerText = data.definitions[i].example;
  
        }
      }

      if (!localStorage.getItem('dictionary')) {
        localStorage.setItem('dictionary', data.word);
      } else {
        let dictionary = localStorage.getItem('dictionary') + ' ; ' + data.word;
        localStorage.setItem('dictionary', dictionary)
      }

      let myDictionary = document.querySelector('#myDictionary');
      let split = localStorage.getItem('dictionary').split(' ; '); //what about the first word in local storage, split throws error
      for (let i = 0; i < split.length; i++) {
      myDictionary.appendChild(document.createElement('p')).className= `myDictionary-${i}`;
      document.querySelector(`.myDictionary-${i}`).innerText = split[i];
      }


    })
    .catch(error => console.log('error', error));
}

