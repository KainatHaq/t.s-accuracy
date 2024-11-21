// Define the time limit
let TIME_LIMIT = 60;

// Define quotes to be used
let quotes_array = [
    "Push yourself, because no one else is going to do it for you. Success is earned, not given.",
    "Failure is the condiment that gives success its flavor. Without it, success would have no taste or meaning.",
    "Wake up with determination. Go to bed with satisfaction. Every day brings new opportunities to grow and improve.",
    "It's going to be hard, but hard does not mean impossible. Challenges are just opportunities in disguise.",
    "Learning never exhausts the mind; it only ignites the fire for more knowledge. Be a lifelong learner.",
    "The only way to do great work is to love what you do. Passion fuels perseverance, and persistence leads to greatness.",
    "Failure is simply the opportunity to begin again, this time more intelligently. Every mistake is a lesson in disguise.",
    "Our greatest glory is not in never falling, but in rising every time we fall. Resilience defines true strength.",
    "If you change the way you look at things, the things you look at change. Perspective is everything in life.",
    "Success doesn't come from what you do occasionally, it comes from what you do consistently. Small efforts compound into big results.",
    "The road to success and the road to failure are almost exactly the same. The only difference is persistence and mindset.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. Keep moving forward, no matter what.",
    "The only limit to our realization of tomorrow is our doubts of today. Believe in yourself and take action.",
    "You are never too old to set another goal or to dream a new dream. Life is about reinvention and constant growth.",
    "Dream big and dare to fail. It's in those failures where true growth happens.",
    "Don't wait for the perfect moment. Take the moment and make it perfect. Every step counts toward your goal.",
    "Believe you can and you're halfway there. Confidence is the first step toward achieving anything.",
    "The best way to predict the future is to create it. The power to shape your life is in your hands.",
    "Success is not measured by what you accomplish, but by the obstacles you overcome. Every challenge builds character.",
    "In the middle of every difficulty lies opportunity. Embrace challenges as stepping stones to greatness."
  ];
  

// Selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
  
    // Separate each character and make an element 
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    });
  
    // Roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}

function processCurrentText() {
    // Get current input text and split it
    let curr_input = input_area.value;
    let curr_input_array = curr_input.split('');
  
    // Increment total characters typed
    characterTyped++;
  
    errors = 0;
  
    let quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index];
  
        // Character not typed yet
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });
  
    // Display the number of errors
    error_text.textContent = total_errors + errors;
  
    // Update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
  
    // If current text is completely typed irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();
        total_errors += errors;
        input_area.value = "";
    }
}

function startGame() {
    resetValues();
    updateQuote();
  
    // Clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
  
    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        // Decrease the current time left
        timeLeft--;
    
        // Increase the time elapsed
        timeElapsed++;
    
        // Update the timer text
        timer_text.textContent = timeLeft + "s";
    }
    else {
        finishGame();
    }
}

function finishGame() {
    // Stop the timer
    clearInterval(timer);
  
    // Disable the input area
    input_area.disabled = true;
  
    // Show finishing text
    quote_text.textContent = "Click on restart to start a new game.";
  
    // Display restart button
    restart_btn.style.display = "block";
  
    // Calculate CPM and WPM
    let cpm = Math.round(((characterTyped / timeElapsed) * 60));
    let wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  
    // Update CPM and WPM text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
  
    // Display the CPM and WPM
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}