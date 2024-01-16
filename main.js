var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addBtn = document.getElementById("click");
var NameError = document.getElementById("NameError");
var search = document.querySelector("#search");
var inputs = document.querySelectorAll(".inputs");
var isNameTrue = false;
if (JSON.parse(localStorage.getItem("course"))==null){
    var courses = [];
}
else{
    courses = JSON.parse(localStorage.getItem("course"));
    displayData();
    
}

addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addCourse();
    clearInputs();
    displayData();
});
function addCourse() {
    var course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        decs: courseDescription.value,
        capacity: courseCapacity.value,
    }
    courses.push(course);
    localStorage.setItem("course" , JSON.stringify(courses));
    Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'course added successfully',
        showConfirmButton: false,
        timer: 1500
      })
}

function clearInputs() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function displayData() {
    var results = ``;
    for (var i = 0; i < courses.length; i++) {
        results += `
        <tr>
              <td>${i}</td>  
              <td>${courses[i].name}</td>
              <td>${courses[i].category} </td>
              <td>${courses[i].price} </td>
              <td>${courses[i].decs} </td>
              <td>${courses[i].capacity} </td>
              <td><button class="btn btn-outline-info">update</button></td>
              <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML = results;
}
function deleteCourse(id) {
    courses.splice(id, 1);
    localStorage.setItem("course" , JSON.stringify(courses));
    displayData();
}
search.addEventListener("keyup", function (e) {
    var results = ``;
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))
            results += `
        <tr>
              <td>${i}</td>  
              <td>${courses[i].name}</td>
              <td>${courses[i].category} </td>
              <td>${courses[i].price} </td>
              <td>${courses[i].decs} </td>
              <td>${courses[i].capacity} </td>
              <td><button class="btn btn-outline-info">update</button></td>
              <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML = results;



});

courseName.addEventListener("keyup", function (e) {
    var pattren = /^[A-Z][a-z]{2,10}$/

    if (pattren.test(courseName.value)) {
        if (courseName.classList.contains("is-invalid"))
            courseName.classList.remove("is-invalid");
        courseName.classList.add("is-valid");
        NameError.style.cssText = "display:none";
        isNameTrue=true;
    }
    else {
        if (courseName.classList.contains("is-valid"))
            courseName.classList.remove("is-valid");
        courseName.classList.add("is-invalid");
        NameError.style.cssText = "display:block";
        isNameTrue=false;
    }
    if (isNameTrue)
        addBtn.removeAttribute("disabled");
    else
        addBtn.setAttribute("disabled", "disabled");

})