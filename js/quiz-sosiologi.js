// Array pertanyaan untuk kuis
const questions = [
    {
        question: "1. Usaha pengendalian konﬂik yang melibatkan pihak ketiga sebagai penasihat dalam penyelesaian konﬂik disebut ....",
        choices: ["A. Mediasi", "B. Arbitrase", "C. Konsiliasi", "D. Stalemate "],
        correctAnswer: 0
    },
    {
        question: "2. Sosiologi lahir sebagai ilmu yang mempelajari tentang masyarakat. Istilah sosiologi berasal dari bahasa Yunani socius yang berarti kawan dan logos yang artinya ....",
        choices: ["A. Hubungan sosial", "B. Ilmu atau pikiran", "C. Kehidupan bersama", "D. Hubungan antar kelompok"],
        correctAnswer: 0
    },
    {
        question: "3. Seorang sosiolog merintis upaya penelitian terhadap masyarakat yang selama berabad-abad sebelumnya dianggap mustahil dan mulai memperkenalkan istilah sosiologi. Istilah sosiologi pertama kali dikemukakan oleh ....",
        choices: ["A. A. Max Weber", "B. Ibnu Kaldun", "C. Auguste Comte", "D. Aristoteles"],
        correctAnswer: 2
    },
    {
        question: "4. Sosiologi sebagai ilmu didasarkan pada hasil observasi,tidak spekulatif dan menggunakan akal sehat. Hal ini menunjukaan bahwa sosiologi bersifat ....",
        choices: ["A. Teoritis", "B. Empiris", "C. Kumulatif", "D. Dinamis"],
        correctAnswer: 1
    },
    {
        question: "5. Gejala sosial pada dasarnya merupakan sebuah kajian ilmu yang dipelajari dalam sosiologi, yang diartikan sebagai peristiwa-peristiwa yang terjadi dalam ....",
        choices: ["A. Keluarga", "B. Sekolah", "C. Organisasi", "D. Masyarakat"],
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