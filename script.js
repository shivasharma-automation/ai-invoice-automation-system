// ==============================
// AI Invoice Automation System
// Frontend -> n8n Webhook
// ==============================

// Webhook URL (Development)
const WEBHOOK_URL = "http://localhost:5678/webhook-test/invoice";

// Elements
const form = document.getElementById("invoiceForm");
const invoiceNumber = document.getElementById("invoiceNumber");
const invoiceDate = document.getElementById("invoiceDate");
const submitButton = form.querySelector("button");

// Auto Generate Invoice Number
invoiceNumber.value = "INV-" + Date.now().toString().slice(-6);

// Auto Today's Date
invoiceDate.value = new Date().toISOString().split("T")[0];

// Form Submit
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Generating...";

    // Collect Form Data
    const invoiceData = {
        customerName: document.getElementById("customerName").value,
        customerEmail: document.getElementById("customerEmail").value,
        companyName: document.getElementById("companyName").value,
        invoiceNumber: invoiceNumber.value,
        invoiceDate: invoiceDate.value,
        serviceDescription: document.getElementById("serviceDescription").value,
        amount: document.getElementById("amount").value,
        notes: document.getElementById("notes").value
    };

    try {

        const response = await fetch(WEBHOOK_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(invoiceData)

        });

        if (!response.ok) {
            throw new Error("Webhook Error");
        }

        alert("✅ Data successfully sent to n8n!");

        form.reset();

        invoiceNumber.value = "INV-" + Date.now().toString().slice(-6);
        invoiceDate.value = new Date().toISOString().split("T")[0];

    } catch (error) {

        console.error(error);

        alert("❌ Unable to connect with n8n.");

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Generate Invoice";

    }

});