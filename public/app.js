// Hard-coded admin credentials

const adminCredentials = {
    username: 'ashwini',
    password: '1823'
};


// Hard-coded vendor data
const vendors = [
    { id: 'FB101', name: 'Rohit', department: 'FNB' },
    { id: 'FB102', name: 'Raj', department: 'FNB' },
    { id: 'FB103', name: 'Sanya', department: 'FNB' },
    { id: 'FB104', name: 'Riya', department: 'FNB' },
    { id: 'FB105', name: 'Sheetal', department: 'FNB' },
    { id: 'FB106', name: 'Anmol', department: 'FNB' },
    { id: 'FB107', name: 'Vikas', department: 'FNB' },
    { id: 'FB108', name: 'Nisha', department: 'FNB' },
    { id: 'FB109', name: 'Aman', department: 'FNB' },
    { id: 'FB110', name: 'Kiran', department: 'FNB' },

    { id: 'HK111', name: 'Pooja', department: 'HK' },
    { id: 'HK112', name: 'Aarav', department: 'HK' },
    { id: 'HK113', name: 'Neha', department: 'HK' },
    { id: 'HK114', name: 'Sahil', department: 'HK' },
    { id: 'HK115', name: 'Maya', department: 'HK' },

    { id: 'MT116', name: 'Ishaan', department: 'MT' },
    { id: 'MT117', name: 'Divya', department: 'MT' },
    { id: 'MT118', name: 'Kunal', department: 'MT' },
    { id: 'MT119', name: 'Tara', department: 'MT' },
    { id: 'MT120', name: 'Nikhil', department: 'MT' },

    { id: 'SE121', name: 'Rakesh', department: 'SEC' },
    { id: 'SE122', name: 'Priya', department: 'SEC' },
    { id: 'SE123', name: 'Gaurav', department: 'SEC' },
    { id: 'SE124', name: 'Meera', department: 'SEC' },
    { id: 'SE125', name: 'Anita', department: 'SEC' },

    { id: 'AD126', name: 'Vivek', department: 'ADM' },
    { id: 'AD127', name: 'Alok', department: 'ADM' },
    { id: 'AD127', name: 'Kavita', department: 'ADM' },
    { id: 'AD128', name: 'Sunil', department: 'ADM' },
    { id: 'AD129', name: 'Lata', department: 'ADM' },

    // Add more vendors as needed
];



window.onload = function () {
    checkLoginState();
    // You can also call other initialization functions here if needed
    document.getElementById('department-select').addEventListener('change', populateVendorTable);
    document.getElementById('date-picker').addEventListener('change', fetchAttendance);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('attendance-container').style.display = 'block';
        localStorage.setItem('isLoggedIn', 'true');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('attendance-container').style.display = 'none';
    // Clear any sensitive data or reset form fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('department-select').value = '';
    document.getElementById('date-picker').value = '';
    document.getElementById('vendor-list').innerHTML = '';
    document.getElementById('download-btn').style.display = 'none';
}

function checkLoginState() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('attendance-container').style.display = 'block';
    } else {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('attendance-container').style.display = 'none';
    }
}

function populateVendorTable() {
    const department = document.getElementById('department-select').value;
    const vendorList = document.getElementById('vendor-list');
    vendorList.innerHTML = '';

    const filteredVendors = vendors.filter(vendor => vendor.department === department);

    filteredVendors.forEach((vendor, index) => {
        const row = vendorList.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${vendor.id}</td>
            <td>${vendor.name}</td>
            <td>${vendor.department}</td>
            <td><input type="checkbox" name="attendance" value="${vendor.id}"></td>
        `;
    });
}

document.getElementById('department-select').addEventListener('change', populateVendorTable);
document.getElementById('date-picker').addEventListener('change', fetchAttendance);


function submitAttendance() {
    const date = document.getElementById('date-picker').value;
    const department = document.getElementById('department-select').value;
    const attendanceData = [];

    const checkboxes = document.querySelectorAll('input[name="attendance"]');
    checkboxes.forEach(checkbox => {
        attendanceData.push({
            vendorId: checkbox.value,
            present: checkbox.checked
        });
    });

    // Here you would typically make an API call to submit the attendance data to your backend
    console.log('Submitting attendance data:', { date, department, attendanceData });
    alert('Attendance submitted successfully!');

    document.getElementById('download-btn').style.display = 'block';
}

// ... (keep the existing code for admin credentials and vendors)

async function fetchAttendance() {
    const date = document.getElementById('date-picker').value;
    const department = document.getElementById('department-select').value;

    try {
        const response = await fetch(`/api/attendance/fetch?date=${date}&department=${department}`);
        const attendanceData = await response.json();

        const checkboxes = document.querySelectorAll('input[name="attendance"]');
        checkboxes.forEach(checkbox => {
            const record = attendanceData.find(r => r.vendorId === checkbox.value);
            checkbox.checked = record ? record.present : false;
        });

        document.getElementById('download-btn').style.display = 'block';
    } catch (error) {
        console.error('Error fetching attendance:', error);
        alert('Error fetching attendance data. Please try again.');
    }
}

// function fetchAttendance() {
//     const date = document.getElementById('date-picker').value;
//     const department = document.getElementById('department-select').value;

//     // Here you would typically make an API call to fetch attendance data for the selected date and department
//     // For this example, we'll just simulate it by checking all checkboxes
//     const checkboxes = document.querySelectorAll('input[name="attendance"]');
//     checkboxes.forEach(checkbox => checkbox.checked = false);

//     document.getElementById('download-btn').style.display = 'block';
// }


async function submitAttendance() {
    const date = document.getElementById('date-picker').value;
    const department = document.getElementById('department-select').value;
    const attendanceData = [];

    const checkboxes = document.querySelectorAll('input[name="attendance"]');
    checkboxes.forEach(checkbox => {
        attendanceData.push({
            vendorId: checkbox.value,
            present: checkbox.checked
        });
    });

    try {
        const response = await fetch('/api/attendance/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, department, attendanceData }),
        });

        if (response.ok) {
            alert('Attendance submitted successfully!');
            document.getElementById('download-btn').style.display = 'block';
        } else {
            throw new Error('Failed to submit attendance');
        }
    } catch (error) {
        console.error('Error submitting attendance:', error);
        alert('Error submitting attendance data. Please try again.');
    }
}

// ... (keep the existing downloadAttendance function)


// function downloadAttendance() {
//     const date = document.getElementById('date-picker').value;
//     const department = document.getElementById('department-select').value;

//     // Here you would typically make an API call to get the attendance data in Excel format
//     // For this example, we'll just create a simple CSV string
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Vendor ID,Vendor Name,Department,Present\n";

//     const checkboxes = document.querySelectorAll('input[name="attendance"]');
//     checkboxes.forEach(checkbox => {
//         const vendor = vendors.find(v => v.id === checkbox.value);
//         csvContent += `${vendor.id},${vendor.name},${vendor.department},${checkbox.checked}\n`;
//     });

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `attendance_${department}_${date}.csv`);
//     document.body.appendChild(link);
//     link.click();
// }

function downloadAttendance() {
    const date = document.getElementById('date-picker').value;
    const department = document.getElementById('department-select').value;

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Vendor ID,Vendor Name,Department,Present\n";

    const checkboxes = document.querySelectorAll('input[name="attendance"]');
    checkboxes.forEach(checkbox => {
        const vendor = vendors.find(v => v.id === checkbox.value);
        csvContent += `${date},${vendor.id},${vendor.name},${vendor.department},${checkbox.checked}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${department}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


