// ==========================================
// COMPLAINT TRACKING SYSTEM
// STUDENT + FACULTY
// ==========================================


// ==========================================
// REGISTERED USERS
// ==========================================

const users = {

    // ==========================
    // STUDENTS
    // ==========================

    "STU202643": {
        name: "Anisha",
        role: "student",
        password: "123456"
    },

    "STU202645": {
        name: "Pushpa",
        role: "student",
        password: "123456"
    },

    "STU202657": {
        name: "Manoj",
        role: "student",
        password: "123456"
    },

    "STU202628": {
        name: "Prudhvi",
        role: "student",
        password: "123456"
    },

    "STU202620": {
        name: "Michel",
        role: "student",
        password: "123456"
    },

    "STU202661": {
        name: "Lakshman",
        role: "student",
        password: "123456"
    },


    // ==========================
    // FACULTY
    // ==========================

    "FAC001": {
        name: "Kanoj Kumar",
        role: "faculty",
        password: "123456"
    },

    "FAC002": {
        name: "Anusha",
        role: "faculty",
        password: "123456"
    },

    "FAC003": {
        name: "Jhansi",
        role: "faculty",
        password: "123456"
    },

    "FAC004": {
        name: "Mastan Rao",
        role: "faculty",
        password: "123456"
    }

};


// ==========================================
// CURRENT USER
// ==========================================

let currentRole = "student";
let currentUser = null;


// ==========================================
// COMPLAINT STORAGE
// ==========================================

let complaints = [];


// ==========================================
// PAGE ELEMENTS
// ==========================================

const loginPage =
    document.getElementById("loginPage");

const dashboardPage =
    document.getElementById("dashboardPage");

const loginForm =
    document.getElementById("loginForm");

const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================================
// ROLE SELECTION
// ==========================================

function selectRole(role) {

    currentRole = role;

    const studentBtn =
        document.getElementById("studentRoleBtn");

    const facultyBtn =
        document.getElementById("facultyRoleBtn");

    const loginIdLabel =
        document.getElementById("loginIdLabel");

    const studentIdInput =
        document.getElementById("studentId");


    if (role === "student") {

        studentBtn.classList.add("active");
        facultyBtn.classList.remove("active");

        loginIdLabel.textContent =
            "Student ID";

        studentIdInput.placeholder =
            "Example: STU202643";

    }

    else {

        facultyBtn.classList.add("active");
        studentBtn.classList.remove("active");

        loginIdLabel.textContent =
            "Faculty ID";

        studentIdInput.placeholder =
            "Example: FAC001";

    }

}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const userId =
            document.getElementById("studentId")
                .value
                .trim()
                .toUpperCase();


        const password =
            document.getElementById("password")
                .value
                .trim();


        // EMPTY CHECK

        if (userId === "" || password === "") {

            alert(
                "Please enter ID and Password."
            );

            return;
        }


        // ==========================
        // STUDENT ID FORMAT
        // ==========================

        if (
            currentRole === "student" &&
            !userId.startsWith("STU")
        ) {

            alert(
                "Invalid Student ID.\n\n" +
                "Student ID must start with STU.\n" +
                "Example: STU202643"
            );

            return;
        }


        // ==========================
        // FACULTY ID FORMAT
        // ==========================

        if (
            currentRole === "faculty" &&
            !userId.startsWith("FAC")
        ) {

            alert(
                "Invalid Faculty ID.\n\n" +
                "Faculty ID must start with FAC.\n" +
                "Example: FAC001"
            );

            return;
        }


        // ==========================
        // CHECK USER
        // ==========================

        const user = users[userId];


        if (!user) {

            alert(
                "User ID not found.\n\n" +
                "Please enter a registered ID."
            );

            return;
        }


        // ==========================
        // CHECK ROLE
        // ==========================

        if (user.role !== currentRole) {

            alert(
                "This ID does not belong to the selected role."
            );

            return;
        }


        // ==========================
        // CHECK PASSWORD
        // ==========================

        if (user.password !== password) {

            alert(
                "Incorrect password."
            );

            return;
        }


        // ==========================
        // LOGIN SUCCESS
        // ==========================

        currentUser = {

            id: userId,

            name: user.name,

            role: user.role

        };


        // ==========================
        // DISPLAY NAME
        // ==========================

        document.getElementById(
            "studentName"
        ).textContent = user.name;


        document.getElementById(
            "welcomeName"
        ).textContent = user.name;


        // ==========================
        // PROFILE
        // ==========================

        document.getElementById(
            "profileId"
        ).textContent = userId;


        document.getElementById(
            "profileName"
        ).textContent = user.name;


        document.getElementById(
            "profileRole"
        ).textContent =
            user.role === "student"
                ? "Student"
                : "Faculty";


        // ==========================
        // STUDENT LOGIN
        // ==========================

        if (currentRole === "student") {

            document.getElementById(
                "userRole"
            ).textContent =
                "Student Portal";


            document.getElementById(
                "topUserRole"
            ).textContent =
                "Student";


            document.getElementById(
                "studentMenu"
            ).style.display =
                "block";


            document.getElementById(
                "facultyMenu"
            ).style.display =
                "none";


            document.getElementById(
                "studentStats"
            ).style.display =
                "grid";


            document.getElementById(
                "facultyDashboard"
            ).style.display =
                "none";

        }


        // ==========================
        // FACULTY LOGIN
        // ==========================

        else {

            document.getElementById(
                "userRole"
            ).textContent =
                "Faculty Portal";


            document.getElementById(
                "topUserRole"
            ).textContent =
                "Faculty";


            document.getElementById(
                "studentMenu"
            ).style.display =
                "none";


            document.getElementById(
                "facultyMenu"
            ).style.display =
                "block";


            document.getElementById(
                "studentStats"
            ).style.display =
                "none";


            document.getElementById(
                "facultyDashboard"
            ).style.display =
                "block";

        }


        // ==========================
        // SHOW DASHBOARD
        // ==========================

        loginPage.style.display =
            "none";

        dashboardPage.style.display =
            "block";


        showSection(
            "dashboardSection"
        );


        updateDashboard();

        displayStudentComplaints();

        displayFacultyComplaints();


        // CLEAR LOGIN FORM

        loginForm.reset();

    }
);


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener(
    "click",
    function () {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            dashboardPage.style.display =
                "none";


            loginPage.style.display =
                "flex";


            currentRole =
                "student";


            currentUser =
                null;


            selectRole(
                "student"
            );


            loginForm.reset();

        }

    }
);


// ==========================================
// SHOW SECTION
// ==========================================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(
        section => {

            section.style.display =
                "none";

        }
    );


    const selectedSection =
        document.getElementById(
            sectionId
        );


    if (selectedSection) {

        selectedSection.style.display =
            "block";

    }


    const titles = {

        dashboardSection: [
            "Dashboard",
            "Welcome to Complaint Tracking System"
        ],

        submitSection: [
            "Submit Complaint",
            "Submit your complaint"
        ],

        trackSection: [
            "Track Complaints",
            "Track the status of your complaints"
        ],

        facultyComplaintsSection: [
            "Student Complaints",
            "View complaints submitted by students"
        ],

        updateStatusSection: [
            "Update Complaint Status",
            "Manage complaint status"
        ],

        profileSection: [
            "My Profile",
            "View your account information"
        ],

        passwordSection: [
            "Change Password",
            "Update your account password"
        ]

    };


    if (titles[sectionId]) {

        document.getElementById(
            "pageTitle"
        ).textContent =
            titles[sectionId][0];


        document.getElementById(
            "pageSubtitle"
        ).textContent =
            titles[sectionId][1];

    }


    // ACTIVE NAV ITEM

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );


    const clickedButton =
        [
            ...navItems
        ].find(
            button =>
                button.getAttribute(
                    "onclick"
                ) &&
                button.getAttribute(
                    "onclick"
                ).includes(
                    sectionId
                )
        );


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }

}


// ==========================================
// COMPLAINT FORM
// ==========================================

const complaintForm =
    document.getElementById(
        "complaintForm"
    );


complaintForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!currentUser) {

            alert(
                "Please login first."
            );

            return;
        }


        const category =
            document.getElementById(
                "category"
            ).value;


        const subject =
            document.getElementById(
                "subject"
            )
            .value
            .trim();


        const description =
            document.getElementById(
                "description"
            )
            .value
            .trim();


        const location =
            document.getElementById(
                "location"
            )
            .value
            .trim();


        if (
            category === "" ||
            subject === "" ||
            description === "" ||
            location === ""
        ) {

            alert(
                "Please fill all complaint details."
            );

            return;
        }


        // UNIQUE COMPLAINT ID

        const complaintNumber =
            complaints.length + 1;


        const complaint = {

            id:
                "CMP" +
                String(
                    complaintNumber
                ).padStart(
                    3,
                    "0"
                ),


            studentId:
                currentUser.id,


            studentName:
                currentUser.name,


            category:
                category,


            subject:
                subject,


            description:
                description,


            location:
                location,


            date:
                new Date()
                    .toLocaleDateString(),


            status:
                "Pending"

        };


        complaints.push(
            complaint
        );


        updateDashboard();

        displayStudentComplaints();

        displayFacultyComplaints();


        complaintForm.reset();


        alert(
            "Complaint submitted successfully!\n\n" +
            "Complaint ID: " +
            complaint.id
        );


        showSection(
            "trackSection"
        );

    }
);


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    if (!currentUser) {
        return;
    }


    const userComplaints =
        currentUser.role === "student"

            ? complaints.filter(
                complaint =>
                    complaint.studentId ===
                    currentUser.id
            )

            : complaints;


    const total =
        userComplaints.length;


    const pending =
        userComplaints.filter(
            complaint =>
                complaint.status ===
                "Pending"
        ).length;


    const progress =
        userComplaints.filter(
            complaint =>
                complaint.status ===
                "In Progress"
        ).length;


    const resolved =
        userComplaints.filter(
            complaint =>
                complaint.status ===
                "Resolved"
        ).length;


    document.getElementById(
        "totalComplaints"
    ).textContent =
        total;


    document.getElementById(
        "pendingComplaints"
    ).textContent =
        pending;


    document.getElementById(
        "progressComplaints"
    ).textContent =
        progress;


    document.getElementById(
        "resolvedComplaints"
    ).textContent =
        resolved;

}


// ==========================================
// STUDENT COMPLAINTS
// ==========================================

function displayStudentComplaints() {

    const table =
        document.getElementById(
            "complaintTableBody"
        );


    table.innerHTML = "";


    if (!currentUser) {
        return;
    }


    const studentComplaints =
        complaints.filter(
            complaint =>
                complaint.studentId ===
                currentUser.id
        );


    if (
        studentComplaints.length === 0
    ) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No complaints submitted yet.
                </td>
            </tr>
        `;

        return;
    }


    studentComplaints.forEach(
        complaint => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${complaint.id}
                    </strong>
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

                    <span class="status ${getStatusClass(
                        complaint.status
                    )}">

                        ${complaint.status}

                    </span>

                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}


// ==========================================
// FACULTY COMPLAINTS
// ==========================================

function displayFacultyComplaints() {

    const table =
        document.getElementById(
            "facultyComplaintTable"
        );


    table.innerHTML = "";


    if (
        complaints.length === 0
    ) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    No complaints available.
                </td>
            </tr>
        `;

        return;
    }


    complaints.forEach(
        complaint => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${complaint.id}
                    </strong>
                </td>

                <td>
                    ${complaint.studentId}
                </td>

                <td>
                    ${complaint.studentName}
                </td>

                <td>
                    ${complaint.category}
                </td>

                <td>
                    ${complaint.subject}
                </td>

                <td>

                    <span class="status ${getStatusClass(
                        complaint.status
                    )}">

                        ${complaint.status}

                    </span>

                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}


// ==========================================
// STATUS CLASS
// ==========================================

function getStatusClass(status) {

    if (
        status === "Pending"
    ) {

        return "pending";

    }


    if (
        status === "In Progress"
    ) {

        return "progress";

    }


    if (
        status === "Resolved"
    ) {

        return "resolved";

    }


    return "";

}


// ==========================================
// UPDATE COMPLAINT STATUS
// ==========================================

const statusForm =
    document.getElementById(
        "statusForm"
    );


statusForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ONLY FACULTY CAN UPDATE STATUS

        if (
            !currentUser ||
            currentUser.role !== "faculty"
        ) {

            alert(
                "Only faculty can update complaint status."
            );

            return;
        }


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
                    item.id ===
                    complaintId
            );


        if (!complaint) {

            alert(
                "Complaint ID not found."
            );

            return;
        }


        if (newStatus === "") {

            alert(
                "Please select a status."
            );

            return;
        }


        complaint.status =
            newStatus;


        updateDashboard();

        displayStudentComplaints();

        displayFacultyComplaints();


        statusForm.reset();


        alert(
            "Complaint status updated successfully!"
        );

    }
);


// ==========================================
// CHANGE PASSWORD
// ==========================================

const passwordForm =
    document.getElementById(
        "passwordForm"
    );


passwordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // CHECK LOGIN

        if (!currentUser) {

            alert(
                "Please login first."
            );

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


        // EMPTY CHECK

        if (
            currentPassword === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {

            alert(
                "Please fill all password fields."
            );

            return;
        }


        // ==========================
        // CHECK CURRENT PASSWORD
        // ==========================

        const user =
            users[currentUser.id];


        if (
            !user ||
            user.password !==
            currentPassword
        ) {

            alert(
                "Current password is incorrect."
            );

            return;
        }


        // ==========================
        // NEW PASSWORD LENGTH
        // ==========================

        if (
            newPassword.length < 6
        ) {

            alert(
                "New password must contain at least 6 characters."
            );

            return;
        }


        // ==========================
        // SAME PASSWORD CHECK
        // ==========================

        if (
            newPassword ===
            currentPassword
        ) {

            alert(
                "New password must be different from current password."
            );

            return;
        }


        // ==========================
        // CONFIRM PASSWORD
        // ==========================

        if (
            newPassword !==
            confirmPassword
        ) {

            alert(
                "New password and confirm password do not match."
            );

            return;
        }


        // ==========================
        // UPDATE PASSWORD
        // ==========================

        user.password =
            newPassword;


        // ==========================
        // UPDATE CURRENT USER
        // ==========================

        currentUser.password =
            newPassword;


        passwordForm.reset();


        alert(
            "Password changed successfully!\n\n" +
            "You can now login using your new password."
        );


        // GO TO DASHBOARD

        showSection(
            "dashboardSection"
        );

    }
);


// ==========================================
// INITIAL SETUP
// ==========================================

loginPage.style.display =
    "flex";


dashboardPage.style.display =
    "none";


selectRole(
    "student"
);