document.addEventListener('DOMContentLoaded', function() {
    const dotsContainer = document.querySelector('.dots-container');
    const totalDots = 200;

    for (let i = 0; i < totalDots; i++) {
        const dotWrapper = document.createElement('div');
        dotWrapper.classList.add('dot-wrapper');

        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', toggleDot);

        const label = document.createElement('p');
        label.textContent = `Job ${i + 1}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter company name';
        input.classList.add('company-input');

        dotWrapper.appendChild(dot);
        dotWrapper.appendChild(label);
        dotWrapper.appendChild(input);
        dotsContainer.appendChild(dotWrapper);
    }

    document.getElementById('download-pdf').addEventListener('click', downloadPDF); // Add event listener for PDF button

    window.addEventListener('beforeunload', function (event) {
    const message = "If you refresh or try to exit the page, all the contents will go!";
    event.returnValue = message; // For most browsers
    return message; // For Firefox
});

});

function toggleDot() {
    this.classList.toggle('checked');
    updateCounter();
}

function updateCounter() {
    const checkedDots = document.querySelectorAll('.dot.checked').length;
    document.getElementById('checked-count').textContent = checkedDots;

    if (checkedDots === 200) {
        showPopup("Well Done Champ", "Take some rest.");
    } else if (checkedDots % 10 === 0 && checkedDots !== 0) {
        showPopup(`Congrats, you have applied for ${checkedDots} jobs!`);
    }
}

// Function to show the popup message
function showPopup(mainMessage, subMessage = '') {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const mainText = document.createElement('p');
    mainText.textContent = mainMessage;
    mainText.style.fontSize = '22px';

    popup.appendChild(mainText);

    if (subMessage) {
        const subText = document.createElement('p');
        subText.textContent = subMessage;
        subText.style.fontSize = '18px';
        subText.style.marginTop = '10px';
        popup.appendChild(subText);
    }

    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
// Function to download the PDF
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the current date
    const date = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString(undefined, options).replace(/\//g, '-'); // Format the date as MM-DD-YYYY

    doc.setFontSize(16);
    doc.text("Job Application Tracker", 14, 10);
    doc.setFontSize(12);
    
    // Add the date to the PDF
    doc.text(`Date: ${formattedDate}`, 14, 20);

    const checkedDots = document.querySelectorAll('.dot.checked').length;

    for (let i = 0; i < checkedDots; i++) {
        const jobLabel = document.querySelectorAll('.dot-wrapper p')[i].textContent; // Get job label
        const companyInput = document.querySelectorAll('.company-input')[i].value; // Get company name
        doc.text(`${jobLabel}: ${companyInput}`, 14, 30 + (i * 10)); // Write to PDF
    }

    // Set the filename with the date
    doc.save(`job_application_tracker_${formattedDate}.pdf`); // Save the PDF with date in filename
}

document.addEventListener('DOMContentLoaded', function () {
    const developerName = document.getElementById('developer-name');
    const videoModal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.close-button');

    // Show the modal when the developer name is clicked
    developerName.addEventListener('click', function () {
        videoModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', function () {
        videoModal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
        }
    });
});
