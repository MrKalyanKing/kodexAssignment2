const calculateBtn = document.getElementById("calculate-bmi-btn");
const bmiModal = document.getElementById("bmi-modal");
const closeModalBtn = document.getElementById("close-bmi-modal");

//setting the range value
const   Height_value=document.getElementById("heightValue")
const range_value=document.getElementById("heightRange")

//incrementing the value and decrementing the value

const age_value=document.getElementById("AgeValue")
const weight_value=document.getElementById("weightValue")

const plus=document.querySelector('.plus')
const minus=document.querySelector('.minus')

const pluss=document.querySelector('.plus1')
const minuss=document.querySelector('.minus1')


//Getting the result span
const result=document.getElementById("res_num")
const category=document.getElementById("res_category")

range_value.addEventListener('input',()=>{
    Height_value.textContent=range_value.value
})


// Storing the data of each user



//function that increase the value
let weight=30

plus.addEventListener('click',()=>{
    weight++;
    weight_value.textContent=weight

})

minus.addEventListener('click',()=>{
    if(weight > 1){
        weight--
        weight_value.textContent=weight
    }
})


let age=15

pluss.addEventListener('click',()=>{
    age++;
    age_value.textContent=age

})

minuss.addEventListener('click',()=>{
    if(age > 1){
        age--
        age_value.textContent=age
    }
})

// function to calculate the BMI

const BMI_Calculator=()=>{
     let heightCm = document.getElementById("heightValue").textContent;
    let weight = document.getElementById("weightValue").textContent;

    console.log(heightCm)
    console.log(weight)

    let heightM = Number(heightCm) / 100;

    let res = Number(weight) / (heightM * heightM);

    console.log(res.toFixed(2));

    result.textContent=res.toFixed(2)
    if (res < 18.5) {
            category.textContent= "Underweight";
            category.style.color="red"
        } 
        else if (res < 25) {
            category.textContent= "Normal Weight";
            category.style.color="green"
        } 
        else if (res < 30) {
            category.textContent= "OverWeigth";
            category.style.color="yellow"
        } 
        else {
            category.textContent= "Obessity";
            category.style.color="red"
        }

}

//saving the result in array

let BMI_User_data = JSON.parse(localStorage.getItem("bmiData")) || [];

const save_res = () => {

    let heightCm = document.getElementById("heightValue").textContent;
    let weight = document.getElementById("weightValue").textContent;
    let age = document.getElementById("AgeValue").textContent;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let BMI = document.getElementById("res_num").textContent;
    let cat = document.getElementById("res_category").textContent;

    let userData = {
        height: heightCm,
        weight: weight,
        age: age,
        gender: gender,
        bmi: BMI,
        category: cat
    };

    BMI_User_data.push(userData);

    localStorage.setItem("bmiData", JSON.stringify(BMI_User_data));

    console.log(BMI_User_data);
    alert("BMI is Saved")
    document.getElementById("bmi-modal").style.display="none"
};

//Displayin the data

const bmi_table=document.querySelector(".bmi-table")

const Display_Data=()=>{
    bmi_table.style.display="table"

    const data= JSON.parse(localStorage.getItem("bmiData")) || []

    console.log(data)

    const table=document.querySelector("#bmiTable")
    table.innerHTML=""
    data.forEach((item,index) => {
        table.innerHTML+=`
        <tr>
            <td>${item.height}</td>
            <td>${item.weight}</td>
            <td>${item.age}</td>
            <td>${item.gender}</td>
            <td>${item.bmi}</td>
            <td>${item.category}</td>
            <td  id="delete" onclick="deleteRow(${index})" style="cursor: pointer; background-color: blue; border-radius:5px; color:white">Delete</td>
        </tr>
        `
    });
}

const deleteRow = (index) => {

    let data = JSON.parse(localStorage.getItem("bmiData")) || [];

    data.splice(index, 1);

    localStorage.setItem("bmiData", JSON.stringify(data));

    Display_Data();
};

if (calculateBtn && bmiModal) {
  calculateBtn.addEventListener("click", () => {
    bmiModal.classList.add("show");
  });
}
if (closeModalBtn && bmiModal) {
  closeModalBtn.addEventListener("click", () => {
    bmiModal.classList.remove("show");
  });
}

if (bmiModal) {
  bmiModal.addEventListener("click", (event) => {
    if (event.target === bmiModal) {
      bmiModal.classList.remove("show");
    }
  });
}
