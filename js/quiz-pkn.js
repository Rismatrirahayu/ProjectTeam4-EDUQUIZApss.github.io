
// Array pertanyaan untuk kuis
const questions = [
    {
        question: "1. Hukum yang menitikberatkan pada hal-hal teknis yang dibuat berdasarkan wewenang yang diberikan oleh hukum tata negara adalah ....",
        choices: ["A. Hukum Pidana", "B. Hukum Perdata", "C. KUHP Pidana", "D. Hukum administrasi negara"],
        correctAnswer: 3
    },
    {
        question: "2. Negara memiliki wewenang menetapkan tujuan bersama masyarakat serta menetapkan organisasi dan aliran kepercayaan yang boleh hidup berkembang atau tidak boleh tumbuh. Sifat hakikat negara yang demikian ini adalah ....",
        choices: ["A. Memaksa", "B. Monopoli", "C. Mencakup Semua", "D. Berkuasa"],
        correctAnswer: 0
    },
    {
        question: "3. Manusia dilahirkan memiliki ciri khas sendiri-sendiri sehingga berbeda dengan yang lain. Keadaan ini menunjukkan bahwa manusia adalah ....",
        choices: ["A. Makhluk sosial", "B. Monodualis", "C. Zoon politicon","D. Makhluk individu"],
        correctAnswer: 3
    },
    {
        question: "4. Pactum subjectionis dan pactum unionis dalam asal mula terjadinya negara didasarkan atas penganut teori ....",
        choices: ["A. Relativisme", "B. Individualisme", "C. Perjanjian", "D. Ketuhanan"],
        correctAnswer: 1
    },
    {
        question: "5. Berikut ini yang membedakan manusia dengan makhluk lain adalah ....",
        choices: ["A. Manusia dapat menyesuaikan diri dengan makhluk lain", "B. Manusia memiliki jiwa besar", "C. Manusia memiliki akal, pikiran, dan perasaan", "D. Manusia hanya mengandalkan insting"],
        correctAnswer: 2
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