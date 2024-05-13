/* General styles for the body and HTML document */
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif; /* Consistent font */
    background-color: #f4f4f9; /* Light grey background for the whole page */
    color: #333; /* Standard text color for better readability */
}

/* Main application container styling */
.app {
    max-width: 1200px; /* Adjusted width for a wider layout */
    margin: 20px auto;
    padding: 20px;
    background: #ffffff; /* White background for the main app area */
    border-radius: 8px; /* Soft rounded corners */
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* Subtle shadow for depth */
}

/* Flexbox setup for the main content area */
.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Align items at the start of the flex container */
}

/* Input area styling */
.inputs {
    width: 35%; /* Reduced width to balance the layout */
    margin-right: 2%; /* Space between input and notes area */
}

/* Notes display area styling */
.notes-display {
    width: 63%; /* Increased width for note display area */
    background-color: #fffeeb; /* Soft yellow for note-taking area */
    padding: 10px; /* Padding inside the notes area */
    border-radius: 5px; /* Rounded corners for the notes area */
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Shadow for depth */
}

/* Styling for headers within the app */
h1, h2 {
    color: #333; /* Dark grey for headings */
    margin-bottom: 10px; /* Space below headings */
}

/* Form elements styling */
textarea, input[type="text"], select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px; /* Rounded corners for form elements */
    box-sizing: border-box;
}

/* Button styling */
button {
    background-color: #4a90e2; /* Bright blue for buttons */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px; /* Slightly rounded corners for buttons */
    cursor: pointer;
    transition: background-color 0.3s; /* Smooth transition for hover effect */
}

button:hover {
    background-color: #357ABD; /* Darker blue on hover */
}

/* List styling for notes */
ul {
    list-style: none;
    padding: 0;
}

/* Individual note styling */
li {
    background-color: #ffffff; /* White background for individual notes */
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    position: relative; /* Essential for correct positioning of child absolute elements */
}

/* Delete button styling inside notes */
.delete-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: #7489ff; /* Light blue for delete buttons */
    color: white;
    border-radius: 15px; /* Soft rounded corners */
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 30px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.delete-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: #7489ff; /* Light blue for delete buttons */
    color: white;
    border-radius: 15px;
    width: auto; /* Ensure the width adjusts to content size */
    height: 30px; /* Fixed height for consistency */
    padding: 5px 10px; /* Adjust padding if needed */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px; /* Check if this size is appropriate */
    line-height: 30px; /* Ensures vertical alignment */
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.delete-btn:hover {
    background: #5c67f2; /* Darker shade on hover */
}
