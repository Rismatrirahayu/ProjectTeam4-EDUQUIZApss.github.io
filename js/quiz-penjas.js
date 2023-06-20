// Array pertanyaan untuk kuis
const questions = [
    {
        question: "1. Dari keterampilan dasar menahan bola selain penjaga gawang, pada dasarnya semua anggota tubuh dari pemain sepak bola boleh dipergunakan, kecuali ....",
        choices: ["A. Tangan", "B. Kepala", "C. Paha", "D. Kaki bagian luar"],
        correctAnswer: 0
    },
    {
        question: "2. Posisi pemain yang bertugas sebagai penyerang tengah disebut ....",
        choices: ["A. Center back", "B. Full back", "C. Striker", "D. Libero"],
        correctAnswer: 2
    },
    {
        question: "3. Pola pertahanan satu jaga satu di daerah pertahanan dinamakan ....",
        choices: ["A. Man to man", "B. Zone Marking", "C. Zone Defence", "D. Total football"],
        correctAnswer: 0
    },
    {
        question: "4. Dalam susunan pemain sepak bola, pemain yang bebas disebut ....",
        choices: ["A. Libero", "B. Penyerang", "C. Pertahanan", "D. Center back"],
        correctAnswer: 0
    },
    {
        question: "5. Perpanjangan waktu dalam suatu pertandingan sepak bola, tim yang pertama kali memasukkan gol dinyatakan sebagai pemenang. Sistem ini dikenal dengan istilah ....",
        choices: ["A. Golden gol", "B. Golden kick", "C. Silver gol", "D. Sudden death"],
        correctAnswer: 3
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