/* =====================================================
   COMPLAINT TRACKING SYSTEM
   STUDENT + FACULTY
   ===================================================== */

let currentRole = "student";
let currentUser = null;


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

let complaints =
    JSON.parse(localStorage.getItem("complaints") || "[]");

let registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers") || "[]");


/* =====================================================
   ROLE SELECTION
   ===================================================== */

function selectRole(role) {

    currentRole = role;

    const studentBtn =
        document.getElementById("studentRoleBtn");

    const facultyBtn =
        document.getElementById("facultyRoleBtn");

    document.getElementById("loginTitle").textContent =
        role === "student"
            ? "Student Login"
            : "Faculty Login";

    document.getElementById("registerTitle").textContent =
        role === "student"
            ? "Student Registration"
            : "Faculty Registration";

    if (role === "student") {

        studentBtn.classList.add("active");
        facultyBtn.classList.remove("active");

    } else {

        facultyBtn.classList.add("active");
        studentBtn.classList.remove("active");
    }
}


/* =====================================================
   LOGIN / REGISTER BOX
   ===================================================== */

function showLogin() {

    document.getElementById("loginBox").style.display =
        "block";

    document.getElementById("registerBox").style.display =
        "none";
}


function showRegister() {

    document.getElementById("loginBox").style.display =
        "none";

    document.getElementById("registerBox").style.display =
        "block";
}


/* =====================================================
   REGISTER
   ===================================================== */

function registerUser() {

    const name =
        document.getElementById("registerName").value.trim();

    const loginId =
        document.getElementById("registerId").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById(
            "registerConfirmPassword"
        ).value;

    const message =
        document.getElementById("registerMessage");

    message.textContent = "";


    if (!name || !loginId || !password || !confirmPassword) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    const existingUser =
        registeredUsers.find(
            user =>
                user.loginId.toLowerCase() ===
                loginId.toLowerCase()
        );


    if (existingUser) {

        message.textContent =
            "This Login ID is already registered.";

        return;
    }


    registeredUsers.push({

        name: name,
        loginId: loginId,
        password: password,
        role: currentRole

    });


    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(registeredUsers)
    );


    message.textContent =
        "Registration successful! Please login.";


    document.getElementById("registerForm").reset();


    setTimeout(() => {

        showLogin();

    }, 1000);
}


/* =====================================================
   LOGIN
   ===================================================== */

function login() {

    const loginId =
        document.getElementById("loginId").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    message.textContent = "";


    if (!loginId || !password) {

        message.textContent =
            "Please enter Login ID and Password.";

        return;
    }


    const registeredUser =
        registeredUsers.find(
            user =>
                user.loginId.toLowerCase() ===
                loginId.toLowerCase() &&

                user.password === password &&

                user.role === currentRole
        );


    /*
       Demo login:
       If user is not registered, login is still allowed.
    */

    if (registeredUser) {

        currentUser = registeredUser;

    } else {

        currentUser = {

            name: loginId,
            loginId: loginId,
            password: password,
            role: currentRole

        };
    }


    openDashboard();
}


/* =====================================================
   OPEN DASHBOARD
   ===================================================== */

function openDashboard() {

    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("dashboardPage").style.display =
        "flex";


    document.getElementById("studentName").textContent =
        currentUser.name;

    document.getElementById("welcomeName").textContent =
        currentUser.name;


    document.getElementById("topUserRole").textContent =
        currentUser.role === "student"
            ? "Student"
            : "Faculty";


    document.getElementById("portalTitle").textContent =
        currentUser.role === "student"
            ? "Student Portal"
            : "Faculty Portal";


    if (currentUser.role === "student") {

        document.getElementById("studentMenu").style.display =
            "block";

        document.getElementById("facultyMenu").style.display =
            "none";

        document.getElementById("facultyDashboard").style.display =
            "none";

    } else {

        document.getElementById("studentMenu").style.display =
            "none";

        document.getElementById("facultyMenu").style.display =
            "block";

        document.getElementById("facultyDashboard").style.display =
            "block";
    }


    updateProfile();

    updateDashboard();

    showSection("dashboardSection");
}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    currentUser = null;

    document.getElementById("dashboardPage").style.display =
        "none";

    document.getElementById("loginPage").style.display =
        "flex";


    document.getElementById("loginId").value = "";

    document.getElementById("loginPassword").value = "";

    document.getElementById("loginMessage").textContent = "";


    selectRole("student");

    showLogin();
}


/* =====================================================
   SHOW SECTION
   ===================================================== */

function showSection(sectionId, clickedButton = null) {

    document
        .querySelectorAll(".content-section")
        .forEach(section => {

            section.style.display = "none";

        });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.style.display = "block";
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        const dashboardButton =
            document.querySelector(
                '.nav-btn[onclick*="dashboardSection"]'
            );

        if (dashboardButton) {

            dashboardButton.classList.add("active");
        }
    }


    const titleMap = {

        dashboardSection: [
            "Dashboard",
            "Welcome to Complaint Tracking System"
        ],

        submitSection: [
            "Submit Complaint",
            "Raise your complaint to the appropriate authority."
        ],

        trackSection: [
            "Track Complaints",
            "View the current status of your complaints."
        ],

        facultyComplaintsSection: [
            "View Complaints",
            "View complaints submitted by students."
        ],

        updateStatusSection: [
            "Update Complaint Status",
            "Update the current status of a complaint."
        ],

        profileSection: [
            "My Profile",
            "View your account information."
        ],

        passwordSection: [
            "Change Password",
            "Update your account password."
        ]
    };


    if (titleMap[sectionId]) {

        document.getElementById("pageTitle").textContent =
            titleMap[sectionId][0];

        document.getElementById("pageSubtitle").textContent =
            titleMap[sectionId][1];
    }


    if (sectionId === "trackSection") {

        displayStudentComplaints();
    }


    if (sectionId === "facultyComplaintsSection") {

        displayFacultyComplaints();
    }


    updateDashboard();
}


/* =====================================================
   GENERATE COMPLAINT ID
   ===================================================== */

function generateComplaintId() {

    let number = complaints.length + 1;

    let id =
        "CMP" +
        String(number).padStart(3, "0");


    while (
        complaints.some(
            complaint => complaint.id === id
        )
    ) {

        number++;

        id =
            "CMP" +
            String(number).padStart(3, "0");
    }


    return id;
}


/* =====================================================
   SUBMIT COMPLAINT
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ---------------------------------------------
           COMPLAINT FORM
           --------------------------------------------- */

        const complaintForm =
            document.getElementById("complaintForm");


        if (complaintForm) {

            complaintForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {

                        alert("Please login first.");

                        return;
                    }


                    const category =
                        document.getElementById(
                            "category"
                        ).value;


                    const complaintTo =
                        document.getElementById(
                            "complaintTo"
                        ).value;


                    const subject =
                        document.getElementById(
                            "subject"
                        ).value.trim();


                    const location =
                        document.getElementById(
                            "location"
                        ).value.trim();


                    const description =
                        document.getElementById(
                            "description"
                        ).value.trim();


                    if (
                        !category ||
                        !complaintTo ||
                        !subject ||
                        !location ||
                        !description
                    ) {

                        alert(
                            "Please fill all complaint details."
                        );

                        return;
                    }


                    /* --------------------------------
                       CREATE NEW COMPLAINT
                       -------------------------------- */

                    const newComplaint = {

                        id: generateComplaintId(),

                        studentId:
                            currentUser.loginId,

                        studentName:
                            currentUser.name,

                        complaintTo:
                            complaintTo,

                        category:
                            category,

                        subject:
                            subject,

                        location:
                            location,

                        description:
                            description,

                        date:
                            new Date().toLocaleDateString(),

                        status:
                            "Pending"

                    };


                    /* --------------------------------
                       SAVE COMPLAINT
                       -------------------------------- */

                    complaints.push(newComplaint);


                    localStorage.setItem(
                        "complaints",
                        JSON.stringify(complaints)
                    );


                    alert(
                        "Complaint submitted successfully!\n\n" +
                        "Complaint ID: " +
                        newComplaint.id
                    );


                    complaintForm.reset();


                    updateDashboard();


                    /*
                       Student can immediately see
                       the submitted complaint.
                    */

                    showSection("trackSection");

                }
            );
        }


        /* ---------------------------------------------
           STATUS UPDATE FORM
           --------------------------------------------- */

        const statusForm =
            document.getElementById("statusForm");


        if (statusForm) {

            statusForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const complaintId =
                        document.getElementById(
                            "statusComplaintId"
                        )
                        .value
                        .trim()
                        .toUpperCase();


                    const newStatus =
                        document.getElementById(
                            "newStatus"
                        ).value;


                    const complaint =
                        complaints.find(
                            item =>
                                item.id.toUpperCase() ===
                                complaintId
                        );


                    if (!complaint) {

                        alert(
                            "Complaint ID not found."
                        );

                        return;
                    }


                    complaint.status =
                        newStatus;


                    localStorage.setItem(
                        "complaints",
                        JSON.stringify(complaints)
                    );


                    alert(
                        "Complaint status updated successfully!"
                    );


                    statusForm.reset();


                    displayFacultyComplaints();

                    updateDashboard();
                }
            );
        }


        /* ---------------------------------------------
           PASSWORD FORM
           --------------------------------------------- */

        const passwordForm =
            document.getElementById("passwordForm");


        if (passwordForm) {

            passwordForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!currentUser) {

                        alert("Please login first.");

                        return;
                    }


                    const currentPassword =
                        document.getElementById(
                            "currentPassword"
                        ).value;


                    const newPassword =
                        document.getElementById(
                            "newPassword"
                        ).value;


                    const confirmPassword =
                        document.getElementById(
                            "confirmPassword"
                        ).value;


                    if (
                        currentPassword !==
                        currentUser.password
                    ) {

                        alert(
                            "Current password is incorrect."
                        );

                        return;
                    }


                    if (newPassword.length < 6) {

                        alert(
                            "New password must contain at least 6 characters."
                        );

                        return;
                    }


                    if (
                        newPassword !==
                        confirmPassword
                    ) {

                        alert(
                            "New passwords do not match."
                        );

                        return;
                    }


                    currentUser.password =
                        newPassword;


                    const userIndex =
                        registeredUsers.findIndex(
                            user =>
                                user.loginId.toLowerCase() ===
                                currentUser.loginId.toLowerCase() &&

                                user.role ===
                                currentUser.role
                        );


                    if (userIndex !== -1) {

                        registeredUsers[
                            userIndex
                        ].password =
                            newPassword;


                        localStorage.setItem(
                            "registeredUsers",
                            JSON.stringify(
                                registeredUsers
                            )
                        );
                    }


                    alert(
                        "Password changed successfully!"
                    );


                    passwordForm.reset();

                }
            );
        }


        selectRole("student");

        showLogin();

    }
);


/* =====================================================
   STUDENT COMPLAINTS
   ===================================================== */

function displayStudentComplaints() {

    const tableBody =
        document.getElementById(
            "complaintTableBody"
        );


    if (!tableBody || !currentUser) {

        return;
    }


    tableBody.innerHTML = "";


    const studentComplaints =
        complaints.filter(
            complaint =>
                complaint.studentId ===
                currentUser.loginId
        );


    if (studentComplaints.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;">

                    No complaints submitted yet.

                </td>

            </tr>

        `;

        return;
    }


    studentComplaints.forEach(
        complaint => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${complaint.id}
                </td>

                <td>
                    ${complaint.complaintTo}
                </td>

                <td>
                    ${complaint.category}
                </td>

                <td>
                    ${complaint.subject}
                </td>

                <td>
                    ${complaint.date}
                </td>

                <td>
                    ${complaint.status}
                </td>

            `;


            tableBody.appendChild(row);
        }
    );
}


/* =====================================================
   FACULTY - VIEW ALL COMPLAINTS
   ===================================================== */

function displayFacultyComplaints() {

    const tableBody =
        document.getElementById(
            "facultyComplaintTable"
        );


    if (!tableBody) {

        return;
    }


    tableBody.innerHTML = "";


    /* ---------------------------------------------
       NO COMPLAINTS
       --------------------------------------------- */

    if (complaints.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;">

                    No complaints submitted by students yet.

                </td>

            </tr>

        `;

        return;
    }


    /* ---------------------------------------------
       SHOW EVERY STUDENT COMPLAINT
       --------------------------------------------- */

    complaints.forEach(
        complaint => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${complaint.id}
                    </strong>
                </td>

                <td>
                    ${complaint.studentId}
                    <br>
                    <small>
                        ${complaint.studentName || ""}
                    </small>
                </td>

                <td>
                    ${complaint.complaintTo}
                </td>

                <td>
                    ${complaint.category}
                </td>

                <td>
                    <strong>
                        ${complaint.subject}
                    </strong>

                    <br>

                    <small>
                        ${complaint.description}
                    </small>

                    <br>

                    <small>
                        📍 ${complaint.location}
                    </small>

                    <br>

                    <small>
                        📅 ${complaint.date}
                    </small>
                </td>

                <td>
                    <span class="status-badge ${getStatusClass(complaint.status)}">
                        ${complaint.status}
                    </span>
                </td>

            `;


            tableBody.appendChild(row);

        }
    );
}


/* =====================================================
   STATUS COLOR CLASS
   ===================================================== */

function getStatusClass(status) {

    if (status === "Pending") {

        return "status-pending";
    }


    if (status === "In Progress") {

        return "status-progress";
    }


    if (status === "Resolved") {

        return "status-resolved";
    }


    return "";
}


/* =====================================================
   UPDATE DASHBOARD COUNTS
   ===================================================== */

function updateDashboard() {

    if (!currentUser) {

        return;
    }


    let userComplaints;


    if (currentUser.role === "student") {

        userComplaints =
            complaints.filter(
                complaint =>
                    complaint.studentId ===
                    currentUser.loginId
            );

    } else {

        /*
           Faculty sees ALL complaints.
        */

        userComplaints = complaints;
    }


    const total =
        userComplaints.length;


    const pending =
        userComplaints.filter(
            complaint =>
                complaint.status === "Pending"
        ).length;


    const progress =
        userComplaints.filter(
            complaint =>
                complaint.status === "In Progress"
        ).length;


    const resolved =
        userComplaints.filter(
            complaint =>
                complaint.status === "Resolved"
        ).length;


    document.getElementById(
        "totalComplaints"
    ).textContent = total;


    document.getElementById(
        "pendingComplaints"
    ).textContent = pending;


    document.getElementById(
        "progressComplaints"
    ).textContent = progress;


    document.getElementById(
        "resolvedComplaints"
    ).textContent = resolved;
}


/* =====================================================
   PROFILE
   ===================================================== */

function updateProfile() {

    if (!currentUser) {

        return;
    }


    document.getElementById(
        "profileId"
    ).value =
        currentUser.loginId;


    document.getElementById(
        "profileName"
    ).value =
        currentUser.name;


    document.getElementById(
        "profileRole"
    ).value =
        currentUser.role === "student"
            ? "Student"
            : "Faculty";
}