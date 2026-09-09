let questions = [];

function addQuestion() {

    const name = document.getElementById("studentName").value.trim();
    const questionText = document.getElementById("questionInput").value.trim();

    if (name === "" || questionText === "") {
        alert("กรุณากรอกชื่อและคำถามก่อนนะ 😊");
        return;
    }

    const question = {
        id: Date.now(),
        name: name,
        text: questionText,
        sameCount: 0,
        answered: false
    };

    questions.push(question);

    document.getElementById("studentName").value = "";
    document.getElementById("questionInput").value = "";

    displayQuestions();
}


function displayQuestions() {

    const list = document.getElementById("questionList");
    const count = document.getElementById("questionCount");

    count.textContent = `${questions.length} Questions`;

    if (questions.length === 0) {

        list.innerHTML = `
            <div class="empty">
                🎉 ยังไม่มีคำถาม
                <br>
                เมื่อมีข้อสงสัย ลองถามคำถามแรกเลย!
            </div>
        `;

        return;
    }

    list.innerHTML = "";

    questions.forEach(question => {

        const card = document.createElement("div");

        card.className = "question-card";

        card.innerHTML = `

            <div class="question-text">
                ❓ ${question.text}
            </div>

            <div class="student">
                Asked by: ${question.name}
            </div>

            <button 
                class="same-question"
                onclick="sameQuestion(${question.id})"
            >
                🙋 สงสัยเหมือนกัน (${question.sameCount})
            </button>

            <button
                class="answered"
                onclick="markAnswered(${question.id})"
            >
                ${question.answered ? "✓ Answered" : "Mark as Answered"}
            </button>

        `;

        list.appendChild(card);
    });
}


function sameQuestion(id) {

    const question = questions.find(q => q.id === id);

    if (question) {
        question.sameCount++;
        displayQuestions();
    }
}


function markAnswered(id) {

    const question = questions.find(q => q.id === id);

    if (question) {
        question.answered = true;
        displayQuestions();
    }
}


displayQuestions();
