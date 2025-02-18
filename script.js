// Initialize counts from the server
let kateCount = 0;
let grantCount = 0;

// Fetch initial counts from the server
fetch('/api/counts')
    .then(response => response.json())
    .then(data => {
        kateCount = data.kateCount;
        grantCount = data.grantCount;
        document.getElementById('kate-count').innerText = kateCount;
        document.getElementById('grant-count').innerText = grantCount;
        updateBars();
    })
    .catch(error => console.error('Error fetching counts:', error));

function updateCount(user, change) {
    if (user === 'kate') {
        if (kateCount + change > 25) { // Check for maximum limit
            showPopup();
        } else {
            kateCount += change;
            updateData();
        }
    } else {
        if (grantCount + change > 25) { // Check for maximum limit
            showPopup();
        } else {
            grantCount += change;
            updateData();
        }
    }
    updateBars();
}

function updateData() {
    fetch('/api/counts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ kateCount, grantCount })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        document.getElementById('kate-count').innerText = kateCount;
        document.getElementById('grant-count').innerText = grantCount;
    })
    .catch(error => console.error('Error updating counts:', error));
}

function updateBars() {
    const kateBar = document.getElementById('kate-bar');
    const grantBar = document.getElementById('grant-bar');
    
    // Set maximum width for the bars
    const maxBarWidth = 240; // Maximum width in pixels

    // Calculate the width based on the count
    kateBar.style.width = (kateCount / 25) * maxBarWidth + 'px'; // Adjust width based on count
    grantBar.style.width = (grantCount / 25) * maxBarWidth + 'px'; // Adjust width based on count
}

function showPopup() {
    document.getElementById('popup').style.display = 'block'; // Show the popup
}

function closePopup() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup
}
