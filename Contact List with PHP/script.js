/* Load contacts from the database as soon as the page is ready */
document.addEventListener("DOMContentLoaded", loadContacts);

/* Fetch all contacts (already ordered by last name by the backend) and render them */
function loadContacts() {
    const tableBody = document.querySelector("#contact-table tbody");

    fetch("getContacts_action.php")
        .then((response) => response.json())
        .then((result) => {
            tableBody.innerHTML = "";

            if (result.status === 200 && result.data.length > 0) {
                result.data.forEach((contact) => {
                    tableBody.appendChild(buildContactRow(contact));
                });
            }
        })
        .catch(() => {
            alert("Unable to load contacts. Please make sure the server and database are running.");
        });
}

/* Build a read-only <tr> for a contact record returned by the backend */
function buildContactRow(contact) {
    const row = document.createElement("tr");
    row.dataset.id = contact.contact_id;

    row.innerHTML = `
        <td>${escapeHtml(contact.last_name)}</td>
        <td>${escapeHtml(contact.first_name)}</td>
        <td>${escapeHtml(contact.email)}</td>
        <td>${escapeHtml(contact.contact_number)}</td>
        <td>
            <button class="edit-button" onclick="editContact(this)">
                <img src="edit_icon.png" alt="Edit">
            </button>
            <button class="delete-button" onclick="deleteContact(this)">
                <img src="trash_icon.png" alt="Delete">
            </button>
        </td>
    `;

    return row;
}

/* Basic escaping so contact data can't break the table markup */
function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

/* Add Contact Function */

function addContact() {
    // Elements
    const tableBody = document.querySelector("#contact-table tbody");
    const row = document.createElement("tr");

    // Input fields for new contact
    row.innerHTML = `
        <td><input type="text" placeholder="Last Name" maxlength="50" required></td>
        <td><input type="text" placeholder="First Name" maxlength="50" required></td>
        <td><input type="email" placeholder="Email Address" maxlength="50" required></td>
        <td><input type="tel" placeholder="Contact Number" maxlength="15" required></td>
        <td>
            <button class="save-button" onclick="saveContact(this)">Save</button>
            <button class="cancel-button" onclick="cancelAdd(this)">Cancel</button>
        </td>
    `;

    // Append to table
    tableBody.appendChild(row);
}

/* Validate the four contact fields; returns an error message, or an empty string if valid */
function validateContactFields(lastName, firstName, email, contactNumber) {
    if (lastName === "" || firstName === "" || email === "" || contactNumber === "") {
        return "Please fill in all fields.";
    }
    if (lastName.length > 50 || firstName.length > 50 || email.length > 50) {
        return "Last name, first name, and email must not exceed 50 characters.";
    }
    if (!/^[0-9]+$/.test(contactNumber) || contactNumber.length > 15) {
        return "Contact number must contain digits only and be at most 15 numbers long.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address.";
    }
    return "";
}

/* Save Contact Function (Add) */

function saveContact(button) {
    // General elements
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input");

    // Elements in input
    const lastName = inputs[0].value.trim();
    const firstName = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const contactNumber = inputs[3].value.trim();

    // Check all fields
    const errorMessage = validateContactFields(lastName, firstName, email, contactNumber);
    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }

    button.disabled = true;

    fetch("addContact_action.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            last_name: lastName,
            first_name: firstName,
            email: email,
            contact_number: contactNumber
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.status === 200) {
                row.remove();
                loadContacts();
            } else {
                alert(result.message || "Unable to add contact.");
                button.disabled = false;
            }
        })
        .catch(() => {
            alert("Unable to reach the server. Please try again.");
            button.disabled = false;
        });
}

/* Edit Contact Function */

function editContact(button) {
    // Elements
    const row = button.closest("tr");
    const lastName = row.cells[0].textContent;
    const firstName = row.cells[1].textContent;
    const email = row.cells[2].textContent;
    const contactNumber = row.cells[3].textContent;

    // Remember the original values so Cancel can restore them exactly
    row.dataset.originalLastName = lastName;
    row.dataset.originalFirstName = firstName;
    row.dataset.originalEmail = email;
    row.dataset.originalContactNumber = contactNumber;

    // Fill in row content
    row.cells[0].innerHTML = `<input type="text" value="${escapeHtml(lastName)}" maxlength="50">`;
    row.cells[1].innerHTML = `<input type="text" value="${escapeHtml(firstName)}" maxlength="50">`;
    row.cells[2].innerHTML = `<input type="email" value="${escapeHtml(email)}" maxlength="50">`;
    row.cells[3].innerHTML = `<input type="tel" value="${escapeHtml(contactNumber)}" maxlength="15">`;

    row.cells[4].innerHTML = `
        <button class="save-button" onclick="updateContact(this)">Save</button>
        <button class="cancel-button" onclick="cancelEdit(this)">Cancel</button>
    `;
}

/* Update Contact Function (Change Input Content from Edit Contact Function) */

function updateContact(button) {
    // Elements
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input");

    // Elements in input
    const lastName = inputs[0].value.trim();
    const firstName = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const contactNumber = inputs[3].value.trim();

    // Check all fields
    const errorMessage = validateContactFields(lastName, firstName, email, contactNumber);
    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }

    button.disabled = true;

    fetch("editContact_action.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contact_id: row.dataset.id,
            last_name: lastName,
            first_name: firstName,
            email: email,
            contact_number: contactNumber
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.status === 200) {
                loadContacts();
            } else {
                alert(result.message || "Unable to update contact.");
                button.disabled = false;
            }
        })
        .catch(() => {
            alert("Unable to reach the server. Please try again.");
            button.disabled = false;
        });
}

/* Delete Contact Function */

function deleteContact(button) {
    // Elements
    const row = button.closest("tr");
    const confirmDelete = confirm(
        "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) {
        return;
    }

    button.disabled = true;

    fetch("deleteContact_action.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_id: row.dataset.id })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.status === 200) {
                row.remove();
            } else {
                alert(result.message || "Unable to delete contact.");
                button.disabled = false;
            }
        })
        .catch(() => {
            alert("Unable to reach the server. Please try again.");
            button.disabled = false;
        });
}

/* Cancel Add Contact Function */

function cancelAdd(button) {
    // Remove input row
    const row = button.closest("tr");
    row.remove();
}

/* Cancel Edit Contact Function */

function cancelEdit(button) {
    // Elements
    const row = button.closest("tr");

    // Restore the original values (not whatever was typed before cancelling)
    row.cells[0].textContent = row.dataset.originalLastName;
    row.cells[1].textContent = row.dataset.originalFirstName;
    row.cells[2].textContent = row.dataset.originalEmail;
    row.cells[3].textContent = row.dataset.originalContactNumber;

    row.cells[4].innerHTML = `
        <button class="edit-button" onclick="editContact(this)">
            <img src="edit_icon.png" alt="Edit">
        </button>

        <button class="delete-button" onclick="deleteContact(this)">
            <img src="trash_icon.png" alt="Delete">
        </button>
    `;
}
