const userContainer = document.getElementById("user-container")

async function getUser(){
  let res = await axios.get("http://localhost:5000/user");
  let user = res.data.user;
  const h1 = document.createElement("h1");
  h1.innerText = `Name : ${user.name}`;
  userContainer.innerHTML = `<p>${user.branch}</p> <p>Age: ${user.age}</p>`;
  // userContainer.append(h1);
  userContainer.prepend(h1);
}

getUser();