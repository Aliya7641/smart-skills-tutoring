// ===== Google Sheet Web App URL =====
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_SHEET_WEB_APP_URL";

// ===== Student Form =====
const studentForm = document.getElementById("form-student");
if (studentForm) {
    studentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = document.getElementById("btn-submit-student");
        btn.disabled = true;
        btn.innerHTML = "Sending…";

        const data = {
            type: "student",
            student_id: "S-" + new Date().getTime(),
            full_name: studentForm.full_name.value,
            dob: studentForm.dob.value,
            parent_name: studentForm.parent_name.value,
            email: studentForm.email.value,
            phone: studentForm.phone.value,
            subjects: Array.from(studentForm.subjects.selectedOptions).map(opt => opt.value),
            goals: studentForm.goals.value,
            preferred_schedule: studentForm.preferred_schedule.value,
            sln: studentForm.sln.value,
            consent: studentForm.consent.checked,
            payment_option: studentForm.payment_option.value,
            source: studentForm.source.value,
            referral_token: studentForm.source_referral_token.value
        };

        fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "success") {
                window.location.href = "thankyou.html?student_id=" + data.student_id + "&token=" + data.referral_token;
            } else {
                alert("Error: " + res.message);
                btn.disabled = false;
                btn.innerHTML = "Submit Application";
            }
        })
        .catch(err => {
            alert("Error: " + err.message);
            btn.disabled = false;
            btn.innerHTML = "Submit Application";
        });
    });
}

// ===== Tutor Form =====
const tutorForm = document.getElementById("form-tutor");
if (tutorForm) {
    tutorForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = document.getElementById("btn-submit-tutor");
        btn.disabled = true;
        btn.innerHTML = "Sending…";

        const data = {
            type: "tutor",
            application_id: "T-" + new Date().getTime(),
            full_name: tutorForm.full_name.value,
            email: tutorForm.email.value,
            phone: tutorForm.phone.value,
            subjects: tutorForm.subjects.value,
            experience: tutorForm.experience.value,
            availability: Array.from(tutorForm.availability).filter(c => c.checked).map(c => c.value),
            session_length: tutorForm.session_length.value,
            dbs_status: tutorForm.dbs_status.value,
            consent: tutorForm.consent_dbs.checked
        };

        fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "success") {
                alert("Application received! We will review and contact you within 48 hours.");
                tutorForm.reset();
                btn.disabled = false;
                btn.innerHTML = "Apply to Tutor";
            } else {
                alert("Error: " + res.message);
                btn.disabled = false;
                btn.innerHTML = "Apply to Tutor";
            }
        })
        .catch(err => {
            alert("Error: " + err.message);
            btn.disabled = false;
            btn.innerHTML = "Apply to Tutor";
        });
    });
}
