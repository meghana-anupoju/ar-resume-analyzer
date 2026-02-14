function saveResume() {

    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    };

    const data = {
        name: getValue("name"),
        email: getValue("email"),
        phone: getValue("phone"),
        linkedin: getValue("linkedin"),
        github: getValue("github"),
        summary: getValue("summary"),
        skills: getValue("skills"),
        projects: getValue("projects"),
        experience: getValue("experience"),
        achievements: getValue("achievements"),
        certifications: getValue("certifications"),
        education: getValue("education")
    };

    // 🔴 Basic Validation
    if (!data.name) {
        alert("⚠ Please enter your Full Name before deploying.");
        return;
    }

    if (!data.email) {
        alert("⚠ Please enter your Email.");
        return;
    }

    // 📧 Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        alert("⚠ Please enter a valid Email address.");
        return;
    }

    // 🚀 Send to Backend (include JWT if present)
    const token = localStorage.getItem('token');
    const headers = { "Content-Type": "application/json" };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    fetch("/saveResume", {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.status === 401) {
            // Not authenticated
            alert('Session expired. Please login again.');
            window.location.href = 'login.html';
            throw new Error('Unauthorized');
        }
        if (!res.ok) {
            throw new Error("Server error");
        }
        return res.json();
    })
    .then(response => {
        alert("🚀 Resume Successfully Deployed to AR System!");
        console.log("Server Response:", response);

        // Optional: Store in localStorage for AR page use
        localStorage.setItem("resumeData", JSON.stringify(data));
    })
    .catch(error => {
        console.error("Error saving resume:", error);
        alert("❌ Failed to deploy resume. Make sure server is running.");
    });
}

// Logout function
function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("resumeData");
    window.location.href = "login.html";
}
