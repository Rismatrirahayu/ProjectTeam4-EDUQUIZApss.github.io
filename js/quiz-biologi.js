// Array pertanyaan untuk kuis
const questions = [
    {
        question: "1. Moluska berikut yang termasuk dalam Chepalopoda adalah....",
        choices: ["A.Bekicot, Ubur-ubur, dan cumi-cumi", "B. Udang, mentimun laut, dan cumi-cumi", "C. Nautilus, sotong, dan cumi-cumi", "D. Tiram, cacing palolo, dan udang"],
        correctAnswer: 2
    },
    {
        question: "2. Fungsi sistem ambulakral pada Echinomodermata adalah sebagai alat....",
        choices: ["A. Pengeluaran", "B. Pernafasan", "C. Berkembang biak", "D. Pertahanan tubuh"],
        correctAnswer: 1
    },
    {
        question: "3. Berikut sifat Arthopoda, kecuali....",
        choices: ["A. Tubuhnya bersegment", "B. Tubuhnya lunak dan dilindungi cangkang", "C. Mempunyai rangka luar","D. Alat nafasnya dengan badan malpighi"],
        correctAnswer: 3
    },
    {
        question: "4. Padi, alang-alang, dan jagung termasuk dalam famili....",
        choices: ["A. Arecaceae", "B. Gramineae", "C. Zingiberaceae", "D. Liliceae"],
        correctAnswer: 1
    },
    {
        question: "5. Ditinjau dari spora yang dihasilkannya, semanggi (Marsilea crenata) tergolong paku....",
        choices: ["A. Homospora", "B. Heterospora", "C. Isospora", "D. Zoozpora"],
        correctAnswer: 1
    }
  ];
  
  let score = 0;

        // Tampilan kuis
        function renderQuiz() {
            const quizContainer = document.getElementById('quiz');
            let html = '';

            // Membuat card untuk setiap pertanyaan
            questions.forEach((question, index) => {
                html += `
                    <div class="card">
                        <div class="card-header custom-header">
                            ${question.question}
                        </div>
                        <div class="card-body">
                            ${renderChoices(question.choices, index)}
                        </div>
                    </div>
                `;
            });

            quizContainer.innerHTML = html;
        }

        // Tampilan pilihan jawaban
        function renderChoices(choices, questionIndex) {
            let html = '';

            // Membuat radio button untuk setiap pilihan jawaban
            choices.forEach((choice, index) => {
                html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" class="mt-10" name="question${questionIndex}" id="choice${questionIndex}${index}" value="${index}">
                        <label class="form-check-label" for="choice${questionIndex}${index}">${choice}</label>
                    </div>
                `;
            });

            return html;
        }

        // Menghitung skor kuis
        function calculateScore() {
            let userAnswers = [];

            // Memeriksa setiap jawaban yang dipilih oleh pengguna
            questions.forEach((question, index) => {
                const selectedChoice = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedChoice) {
                    const selectedAnswer = parseInt(selectedChoice.value);
                    userAnswers.push(selectedAnswer);

                    // Memeriksa apakah jawaban yang dipilih benar atau salah
                    if (selectedAnswer === question.correctAnswer) {
                        score++;
                    }
                }
            });

            return userAnswers;
        }

        // Menampilkan hasil kuis dalam modal
        function showResult() {
            const modal = new bootstrap.Modal(document.getElementById('resultModal'));
            const scoreElement = document.getElementById('score');
            const correctAnswers = score;
            const incorrectAnswers = questions.length - correctAnswers;

            // Menampilkan skor pengguna pada modal
            scoreElement.innerHTML = `
                Correct Answers: ${correctAnswers} <br>
                Incorrect Answers: ${incorrectAnswers}
            `;
            modal.show();

            // Menambahkan event listener pada tombol "Close" di modal
            const closeButton = document.querySelector('.modal-footer button[data-bs-dismiss="modal"]');
            closeButton.addEventListener('click', resetQuiz);
        }

        // Mengosongkan pertanyaan dan mengaktifkan tombol "Submit"
        function resetQuiz() {
            const choices = document.querySelectorAll('input[type="radio"]');
            const submitButton = document.getElementById('submit');

            // Mengosongkan pilihan jawaban
            choices.forEach((choice) => {
                choice.checked = false;
            });

            // Me-reset skor
            score = 0;

            // Mengaktifkan kembali tombol "Submit"
            submitButton.removeAttribute('disabled');
        }

        function handleSubmit() {
            const submitButton = document.getElementById('submit');
            submitButton.addEventListener('click', () => {
                const userAnswers = calculateScore();
                showResult();
                submitButton.disabled = true;
            });
        }

        renderQuiz();
        handleSubmit();