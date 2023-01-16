var myForm = document.querySelector("#my-form");
myForm.addEventListener("submit", getDetails);

var list = document.getElementById("users");

const maps= new Map()

axios
.get(
  "https://crudcrud.com/api/d3def17ce6bf48daa8087ae070139b15/Registration"
)
.then((res) => {
    let data=res.data
    

    for(i of data){
         maps.set(i.email,i._id)   
    }
    loadUsers()
})


// list.addEventListener("click", removelist);

function removelist(e) {
  if (e.target.classList.contains("delete") == true) {
    var removeitem = e.target.parentElement;
    list.removeChild(removeitem);
  }
}

function getDetails(e) {
  e.preventDefault();
  let email = e.target.elements.email.value;
  let UserName = e.target.elements.name.value;
    if(maps.has(email)){
        alert("email Id already Exists")
    }
 else 
  {
    displayDetails(email,UserName)


// delete if required
//   let table = document.querySelector(".table");
//   let row = document.createElement("tr");

//   row.innerHTML = `
// <td>${email}</td>
// <td>${UserName}</td>
// <td>
// <button class="btn btn-danger btn-delete">Delete</button>
// <button class="btn btn-danger btn-edit">Edit</button>
// </td>
// `;
//   table.appendChild(row);

  let Details = {
    Name: UserName,
    email: email,
  };

  axios
    .post(
      "https://crudcrud.com/api/d3def17ce6bf48daa8087ae070139b15/Registration",
      Details
    )
    .then((res) => {
      maps.set(email,res.data._id);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(Details);
}
}

// load data

function loadUsers() {
       for(i of maps.keys())  {
        
         axios.get("https://crudcrud.com/api/d3def17ce6bf48daa8087ae070139b15/Registration/" + maps.get(i))
        .then((res) =>{
            console.log(res.data.email,res.data.Name)
            displayDetails(res.data.email,res.data.Name)
        })  
     }
       
    }

// Dispalay Details

function displayDetails(email, UserName) {
  let table = document.querySelector(".table");
  let row = document.createElement("tr");

  row.innerHTML = `
<td>${UserName}</td>
<td>${email}</td>
<td>
<button class="btn btn-danger btn-delete">Delete</button>
<button class="btn btn-danger btn-edit">Edit</button>
</td>
`;
  table.appendChild(row);
}
