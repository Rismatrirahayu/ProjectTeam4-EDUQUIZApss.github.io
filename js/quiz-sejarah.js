// Array pertanyaan untuk kuis
const questions = [
    {
        question: "1.Sejarah adalah suatu ilmu tersendiri dan tergolong dalam ilmu-ilmu sosial. Pernyataan ini dikemukakan oleh ....",
        choices: ["A. Burry", "B. Spencer", "C. Gottschalk", "D. Notosusanto"],
        correctAnswer: 2
    },
    {
        question: "2. Hubungan sebab akibat antara peristiwa satu dengan peristiwa lain dalam sejarah disebut ....",
        choices: ["A. Periodesasi", "B. Kausalitas", "C. Kronologi", "D. Interpretasi"],
        correctAnswer: 1
    },
    {
        question: "3. Dimensi spasial dalam sejarah disebut dimensi ....",
        choices: ["A. Ruang", "B. Waktu", "C. Peristiwa", "D. Perubahan"],
        correctAnswer: 0
    },
    {
        question: "4. Historiografi terbentuk dari kata Yunani, yaitu historia dan grafien, grafien artinya ....",
        choices: ["A. Sejarah", "B. Tulisan", "C. Hiasan", "D. Seni"],
        correctAnswer: 1
    },
    {
        question: "5. Ilmu yang mempelajari kehidupan masa lampau sebelum adanya sumber- sumber tertulis disebut ....",
        choices: ["A. Ilmu Sejarah", "B. Ilmu prasejarah", "C. Ilmu arkeologi", "D. Ilmu Geologi"],
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