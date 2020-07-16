document.getElementById("my_form").addEventListener("submit", e => {
    e.preventDefault();
    let description = handleJobDescr();
    let location = handleJobLocation();
    let schedule = handleRadioBtns();

    clearUserInput();
    findJobInformation(description, location, schedule);
});

//store user's input 
function handleJobDescr(){
    return document.getElementById("job_description").value;
}
function handleJobLocation(){
    return document.getElementById("job_location").value;
}

function handleRadioBtns() {
    if (document.getElementById("full_time").checked) {
        return "full_time=true";
    }   
    else if (document.getElementById("part_time").checked) {
        return "part_time=true";
    }   
    else if (document.getElementById("remote").checked) {
        return "remote=true";
    }   
}

//function clearing user's input
function clearUserInput() {
    document.getElementById("my_form").reset();
}

//function to get API job data
function findJobInformation(descriptionData, locationData, scheduleData) {
    let targetURL = `https://jobs.github.com/positions.json?description=${descriptionData}&${scheduleData}&location=${locationData}`;
    fetch(targetURL)
    .then(response => response.json())
    .then(data => {
    createCard(data);
  })
} 


//function to generate cards
function createCard(jobs) {
    //create functionality to eraze previouse content from display area div
    document.getElementById("display_area").innerHTML = "";

    for (let i = 0; i < jobs.length; i++) {

    //make a card
    let newCard = document.createElement("div");
    newCard.setAttribute("class", "card mb-3 my_cards");
    newCard.setAttribute("style", "max-width: 540px;");

    //make outer div
    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "row no-gutters");
    newCard.appendChild(outerDiv);
    
    //make div for image
    let imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "col-md-4");
    outerDiv.appendChild(imageDiv);

    //adding image
    let newImage = document.createElement("img");
    newImage.setAttribute("class", "card-img");
    newImage.setAttribute("src", `${jobs[i].company_logo}`);
    imageDiv.appendChild(newImage);

    //make div for cardBody
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "col-md-8");
    outerDiv.appendChild(cardBodyDiv);

    //make card body
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBodyDiv.appendChild(cardBody);

    //make job title
    let jobTitle = document.createElement("h5");
    jobTitle.setAttribute("class", "card-title");
    jobTitle.innerHTML = `${jobs[i].title}`;
    cardBody.appendChild(jobTitle);

    //make job descr <p>
    let jobDescription = document.createElement("p");
    jobDescription.setAttribute("class", "card-text");
    let shortenedDescription;
    if (jobs[i].description.length < 10) {
        shortenedDescription = "Check company's website for details";
    } else {
        shortenedDescription = jobs[i].description.substring(0, 100);
        }
    jobDescription.innerHTML = `${shortenedDescription}...`;
    cardBody.appendChild(jobDescription);
    
    //make how to apply <p>
    let howToApply = document.createElement("p");
    howToApply.setAttribute("class", "card-text");
    howToApply.innerHTML = `Apply: ${jobs[i].how_to_apply}`;
    cardBody.appendChild(howToApply);

    //add btn for job details
    let btnJobDetails = document.createElement("button");
    btnJobDetails.setAttribute("class", "btn btn-primary");
    btnJobDetails.innerHTML = "Job Details"
    btnJobDetails.addEventListener("click", ()=> {
        let detailsURL = `${jobs[i].url}`;
        window.open(detailsURL);
    })



    cardBody.appendChild(btnJobDetails);


    document.getElementById("display_area").appendChild(newCard);
}
}




/*## Deliverable

Use the [GitHub Jobs](https://jobs.github.com/api) api to create a job board.

The job board should have 2 search options:

- job description
- location

⇒ Make sure that the user uses at least one of the 2 options. They can also use both of the options

Below the search options, have 3 buttons that are used to filter the jobs by. Those filters are:

- full time
- part time
- remote

Display the jobs in responsive cards with the following information:

- Company logo picture
- Job Title
- Job description (at most 100 characters)
- How to apply information
- A button to view job in details*/