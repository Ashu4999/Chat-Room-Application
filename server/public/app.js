const socket = io("ws://localhost:3500");

const activity = document.getElementById("activity");
const msgInput = document.querySelector("input");
let activityTimer;

function sendMessage(e) {
    e.preventDefault();
    if(msgInput.value){
        socket.emit("message", msgInput.value);
        msgInput.value = "";
    }
    msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

//listening for messages
socket.on("message", (data) => {
    activity.textContent = "";
    const li = document.createElement("li");
    li.textContent = data;
    document.getElementById("chat-area").appendChild(li);
});

//triggering activity event to know all others that you are typing
msgInput.addEventListener("keydown", () => {
    console.log("EUUU");
    socket.emit("activity", socket.id);
});

socket.on("listen-activity", name => {
    activity.textContent = `${name} is typing...`

    //clear typing status after 500s if no activity
    if(activityTimer) {
        clearTimeout(activityTimer);
    }

    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 500);
});