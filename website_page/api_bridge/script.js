document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chatBox');
    const chatMessage = document.getElementById('chatMessage');
    const cursor = document.getElementById('cursor');
    const typeSound = document.getElementById('typeSound');
    const dingSound = document.getElementById('dingSound');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const startChatBox = document.getElementById('startChatBox');
    const fadeOverlay = document.getElementById('fadeOverlay');
    const background = document.querySelector('.background');
    const imageBox = document.getElementById('imageBox');
    const dialogImage = document.getElementById('dialogImage');

    const messages = [
        "Bzz... Bzz..",
        "A dissonant whisper brushes against your ear, like it’s drifting in from somewhere distant — just behind you, out of sight.",
        "A dissonant whisper brushes against your ear, like it’s drifting in from somewhere distant — just behind you, out of sight.",
        "It’s a murmur and a call all at once, threading through your thoughts, making it hard to think straight.",
        "The sound twists, loops, begins to take shape—a spectral melody winding in on itself. And then, without warning, a voice speaks inside your head.",
        "\"I’m the Agent, the one they sent from the Formicaio.\"",
        "\"Yeah, I know, it’s probably a strange word to you— It might sound like it’s borrowed from a romance language, but in truth, it doesn’t belong to any single tongue or nation.\"",
        "Now it's time for you to talk.",
        "How do you feel about your work?" // New message
    ];

    let currentMessageIndex = 0;
    let isAnimating = false;

    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            chatMessage.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
            typeSound.play();
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback);
            }, 50);
        } else if (typeof fnCallback === 'function') {
            setTimeout(fnCallback, 500);
        }
    }

    function fadeTransition(callback) {
        chatMessage.style.transition = 'opacity 0.5s';
        chatMessage.style.opacity = '0';
        setTimeout(() => {
            chatMessage.innerHTML = '';
            chatMessage.style.opacity = '1';
            if (callback) callback();
        }, 500);
    }

    async function sendMessageToBackend(message) {
        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error communicating with backend:', error);
            return "Sorry, I couldn't process that.";
        }
    }

    function handleUserInput() {
        const userInput = prompt("Enter your message:");
        if (userInput) {
            typeWriter(`You: ${userInput}`, 0, async function () {
                dingSound.play();
                chatBox.classList.add('shake');
                setTimeout(async () => {
                    chatBox.classList.remove('shake');
                    const aiResponse = await sendMessageToBackend(userInput);
                    typeWriter(`AI: ${aiResponse}`, 0, function () {
                        dingSound.play();
                    });
                }, 500);
            });
        }
    }

    cursor.addEventListener('click', function () {
    cursor.addEventListener('click', function () {
        if (isAnimating || currentMessageIndex >= messages.length) return;
        isAnimating = true;

        fadeTransition(() => {
            typeWriter(messages[currentMessageIndex], 0, function () {
                dingSound.play();
                chatBox.classList.add('shake');
                setTimeout(() => {
                    chatBox.classList.remove('shake');

                    // Show the image box after the first message
                if (currentMessageIndex === 1) {
                    imageBox.style.display = 'block'; // Ensure the image box is displayed
                }

                if (currentMessageIndex === 1) {
                    dialogImage.src = 'asset/css/png/slide-dialogo1.png';
                }

                // Change the image after the fourth message
                if (currentMessageIndex === 3) {
                    dialogImage.src = 'asset/css/png/slide-dialogo2.png'; // Update to the new image path
                }
                    currentMessageIndex++;
                    isAnimating = false;

                    if (currentMessageIndex === messages.length) {
                        setTimeout(() => {
                            fadeTransition(() => {
                                welcomeMessage.style.transition = 'opacity 1s';
                                welcomeMessage.style.opacity = '0';
                                fadeOverlay.style.transition = 'opacity 1s';
                                fadeOverlay.style.opacity = '0';
                                background.style.transition = 'opacity 1s';
                                background.style.opacity = '1';
                                setTimeout(() => {
                                    welcomeMessage.style.display = 'none';
                                    startChatBox.style.display = 'block';
                                    startChatBox.style.opacity = '0';
                                    setTimeout(() => {
                                        startChatBox.style.transition = 'opacity 0.5s';
                                        startChatBox.style.opacity = '1';
                                        setTimeout(() => {
                                            typeWriter("Now it's time for you to talk.", 0, function() {
                                                dingSound.play();
                                                chatBox.classList.add('shake');
                                                setTimeout(() => {
                                                    chatBox.classList.remove('shake');
                                                    handleUserInput();  // Start user interaction
                                                }, 500);
                                            });
                                        }, 1000);
                                    }, 50);
                                }, 1000);
                            });
                        }, 1000); // Delay before starting the next message
                        }, 1000); // Delay before starting the next message
                    }
                }, 500);
            });
        });
    });
});
