let mentorDetails = []
let assignedStudentDetails = []
let unAssignedStudentDetails = []

let url = "http://localhost:3000"

function getAssignedStudents() {
    fetch(url + `/get_assigned_students`)
    .then((resp) => {
        return resp.json()
    })
    .then((response) => {
        assignedStudentDetails = response.data
    })
    .catch((err)=>{
        let colDiv2 = document.getElementById("colDivId")
        let alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "margin-top: 50px")
        alertDiv.setAttribute("id", "assignStudentsFailure")
        alertDiv.innerHTML = "<strong>Failure!</strong> Error while fetching the student details"
        colDiv2.appendChild(alertDiv)
        deleteAlert("assignStudentsFailure")
    })
}

function getUnAssignedStudents() {
    fetch(url + `/get_not_assigned_students`)
    .then((resp) => {
        return resp.json()
    })
    .then((response) => {
        unAssignedStudentDetails = response.data
    })
    .catch((err)=>{
        let colDiv2 = document.getElementById("colDivId")
        let alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "margin-top: 50px")
        alertDiv.setAttribute("id", "unAssignStudentsFailure")
        alertDiv.innerHTML = "<strong>Failure!</strong> Error while fetching the student details"
        colDiv2.appendChild(alertDiv)
        deleteAlert("unAssignStudentsFailure")
    })
}

function getMentors() {
    fetch(url + `/get_mentors`)
    .then((resp) => {
        return resp.json()
    })
    .then((response) => {
        mentorDetails = response.data
    })
    .catch((err)=>{
        let colDiv2 = document.getElementById("colDivId")
        let alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "margin-top: 50px")
        alertDiv.setAttribute("id", "mentorFetchFailure")
        alertDiv.innerHTML = "<strong>Failure!</strong> Error while fetching the mentor details"
        colDiv2.appendChild(alertDiv)
        deleteAlert("mentorFetchFailure")
    })
}
getAssignedStudents()
getUnAssignedStudents()
getMentors()

function createStudent(){
    let student_name = document.getElementById("studentNameForm").value
    let batch = document.getElementById("batchForm").value
    let course = document.getElementById("courseForm").value
    fetch(url + `/add-student`, {
        method: "POST",
        body: JSON.stringify({
            student_name, batch, course
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            $('#addStudentModal').modal('hide');
            document.getElementById("studentNameForm").value = ""
            document.getElementById("batchForm").value = ""
            document.getElementById("courseForm").value = ""
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-success")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createStudentSuccess")
            alertDiv.innerHTML = "<strong>Success!</strong> " + data.message 
            colDiv2.appendChild(alertDiv)
            deleteAlert("createStudentSuccess")
        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createStudentFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Error while creating the student"
            colDiv2.appendChild(alertDiv)
            deleteAlert("createStudentFailure")
        })
        getUnAssignedStudents()
}


function assignMentor(){
    let mentor_name = document.getElementById("assignMentorId").value
    let objectId = document.getElementById("assignStudentId").value
    fetch(url + `/assign-mentor/${objectId}`, {
        method: "PUT",
        body: JSON.stringify({
            mentor_name
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            $('#assignMentorModal').modal('hide');
            document.getElementById("assignMentorId").value = ""
            document.getElementById("assignStudentId").value = ""
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-success")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "assignSuccess")
            alertDiv.innerHTML = "<strong>Success!</strong> " + data.message 
            colDiv2.appendChild(alertDiv)
            deleteAlert("assignSuccess")
            
        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "assignFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Error while assigning the mentor"
            colDiv2.appendChild(alertDiv)
            deleteAlert("assignFailure")
        })
        getAssignedStudents()
        getUnAssignedStudents()
}

function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 3000)
}

function createMentor(){
    let mentor_name = document.getElementById("mentorNameForm").value
    let topic = document.getElementById("topicForm").value
    fetch(url + `/add-mentor`, {
        method: "POST",
        body: JSON.stringify({
            mentor_name, topic
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            $('#addMentorModal').modal('hide');
            document.getElementById("mentorNameForm").value = ""
            document.getElementById("topicForm").value = ""
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-success")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createMentorSuccess")
            alertDiv.innerHTML = "<strong>Success!</strong> " + data.message 
            colDiv2.appendChild(alertDiv)
            deleteAlert("createMentorSuccess")

        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createMentorFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Error while creating the mentor"
            colDiv2.appendChild(alertDiv)
            deleteAlert("createMentorFailure")
        })
        getMentors()
}

function changeMentor(){
    let objectId = document.getElementById("changeStudentId").value
    let mentor_name = document.getElementById("changeMentorId").value
    fetch(url + `/change-mentor/${objectId}`, {
        method: "PUT",
        body: JSON.stringify({
            mentor_name
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            $('#changeMentorModal').modal('hide');
            let mentorSelectDiv = document.getElementById("mentorChangeId")
            mentorSelectDiv.setAttribute("class", "d-none form-group row")
            let currentMentorCiv = document.getElementById("currMentorId")
            currentMentorCiv.setAttribute("class", "d-none form-group row")
            document.getElementById("changeMentorId").value = ""
            currentMentor = document.getElementById("currentMentor").value = ""
            document.getElementById("changeStudentId").value = ""
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-success")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "changeMentorSuccess")
            alertDiv.innerHTML = "<strong>Success!</strong> " + data.message
            colDiv2.appendChild(alertDiv)
            deleteAlert("changeMentorSuccess")
        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("colDivId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "changeMentorFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Error while changing the mentor"
            colDiv2.appendChild(alertDiv)
            deleteAlert("changeMentorFailure")
        })
        getAssignedStudents()
        
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function onAssign(){
    let mentorSelect = document.getElementById("assignMentorId")
    removeAllChildNodes(mentorSelect)
    let option1 = document.createElement("option")
    option1.innerText = "--Select--"
    option1.setAttribute("value", "") 
    mentorSelect.appendChild(option1)
    let studentSelect = document.getElementById("assignStudentId")
    removeAllChildNodes(studentSelect)
    let option2 = document.createElement("option")
    option2.innerText = "--Select--"
    option2.setAttribute("value", "") 
    studentSelect.appendChild(option2)
    for (let i=0; i<unAssignedStudentDetails.length; i++){
        let option = document.createElement("option")
        option.innerText = unAssignedStudentDetails[i].student_name
        option.setAttribute("value", unAssignedStudentDetails[i]._id) 
        studentSelect.appendChild(option)
    }

    for (let i=0; i<mentorDetails.length; i++){
        let option = document.createElement("option")
        option.innerText = mentorDetails[i].mentor_name
        option.setAttribute("value", mentorDetails[i].mentor_name) 
        mentorSelect.appendChild(option)
    }
}

function onChange(){
    let studentSelect = document.getElementById("changeStudentId")
    removeAllChildNodes(studentSelect)
    let option2 = document.createElement("option")
    option2.innerText = "--Select--"
    option2.setAttribute("value", "") 
    studentSelect.appendChild(option2)
    for (let i=0; i<assignedStudentDetails.length; i++){
        let option = document.createElement("option")
        option.innerText = assignedStudentDetails[i].student_name
        option.setAttribute("value", assignedStudentDetails[i]._id) 
        studentSelect.appendChild(option)
    }
}

function onStudentSelect(objectId){
    let mentorSelect = document.getElementById("changeMentorId")
    let currentMentor = document.getElementById("currentMentor")
    let mentorSelectDiv = document.getElementById("mentorChangeId")
    mentorSelectDiv.setAttribute("class", "form-group row")
    let currentMentorCiv = document.getElementById("currMentorId")
    currentMentorCiv.setAttribute("class", "form-group row")
    let student = assignedStudentDetails.filter((data)=>{
        return data._id == objectId
    })[0]
    currentMentor.value = student.mentor_name
    for (let i=0; i<mentorDetails.length; i++){
        if (mentorDetails[i].mentor_name !== student.mentor_name){
            let option = document.createElement("option")
            option.innerText = mentorDetails[i].mentor_name
            option.setAttribute("value", mentorDetails[i].mentor_name) 
            mentorSelect.appendChild(option)
        }
    }
}

function onMenteedetails(){
    let mentorSelect = document.getElementById("selectMentorId")
    removeAllChildNodes(mentorSelect)
    let option1 = document.createElement("option")
    option1.innerText = "--Select--"
    option1.setAttribute("value", "") 
    mentorSelect.appendChild(option1)
    for (let i=0; i<mentorDetails.length; i++){
        let option = document.createElement("option")
        option.innerText = mentorDetails[i].mentor_name
        option.setAttribute("value", mentorDetails[i]._id) 
        mentorSelect.appendChild(option)
    }
}

function onMentorSelect(objectId){
    let mentor = mentorDetails.filter((data)=>{
        return data._id == objectId
    })[0]

    let menteeDetails = assignedStudentDetails.filter((data)=>{
        return data.mentor_name == mentor.mentor_name
    })
    
    let menteeTable = document.getElementById("menteeDetailsTable")
    let oldhead = document.getElementById("menteeDetailsHead")
    if (oldhead){
        oldhead.remove()
    }
    let thead1 = document.createElement("thead")
    thead1.setAttribute("class", "thead-light")
    thead1.setAttribute("id", "menteeDetailsHead")
    menteeTable.appendChild(thead1)

    let tr1 = document.createElement("tr")
    thead1.appendChild(tr1)

    let th1 = document.createElement("th")
    th1.setAttribute("scope", "col")
    th1.innerText = "#"
    tr1.appendChild(th1)

    let th2 = document.createElement("th")
    th2.setAttribute("scope", "col")
    th2.innerText = "Mentee Name"
    tr1.appendChild(th2)
    let oldtbody = document.getElementById("menteeDetailsBody")
    if (oldtbody){
        oldtbody.remove()
    }
    let tbody1 = document.createElement("tbody")
    tbody1.setAttribute("id", "menteeDetailsBody") 
    menteeTable.appendChild(tbody1)

    for (let i=0; i<menteeDetails.length; i++){
        let tr2 = document.createElement("tr")
        tbody1.appendChild(tr2)

        let th3 = document.createElement("th")
        th3.setAttribute("scope", "row")
        th3.innerText = i + 1
        tr2.appendChild(th3)

        let td1 = document.createElement("td")
        td1.innerText = menteeDetails[i].student_name
        tr2.appendChild(td1)
    }

}


function onCloseAddStudent(){
    document.getElementById("studentNameForm").value = ""
    document.getElementById("batchForm").value = ""
    document.getElementById("courseForm").value = ""
}

function onCloseAddMentor(){
    document.getElementById("mentorNameForm").value = ""
    document.getElementById("topicForm").value = ""
}


function onCloseAsignMentor(){
    document.getElementById("assignMentorId").value = ""
    document.getElementById("assignStudentId").value = ""
}

function onCloseChangeMentor(){
    let mentorSelectDiv = document.getElementById("mentorChangeId")
    mentorSelectDiv.setAttribute("class", "d-none form-group row")
    let currentMentorCiv = document.getElementById("currMentorId")
    currentMentorCiv.setAttribute("class", "d-none form-group row")
    document.getElementById("changeMentorId").value = ""
    currentMentor = document.getElementById("currentMentor").value = ""
    document.getElementById("changeStudentId").value = ""
}

function onCloseMenteeDetails(){
    let oldhead = document.getElementById("menteeDetailsHead")
    if (oldhead){
        oldhead.remove()
    }
    let oldtbody = document.getElementById("menteeDetailsBody")
    if (oldtbody){
        oldtbody.remove()
    }
}


