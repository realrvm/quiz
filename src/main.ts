import './style.scss';

type Question = {
  id: number;
  question: string;
  correct: string;
  variants: Record<string, string>;
};

const questions: Question[] = [
  {
    id: 1,
    question:
      'Это 1-й вопрос викторины. Выберете, пожалуйста, один из вариантов внизу или перейдите к следующему вопросу. ( ответ : А)',
    variants: { a: 'A', b: 'B', c: 'C' },
    correct: 'A',
  },
  {
    id: 2,
    question:
      'Это 2-й вопрос викторины. Выберете, пожалуйста, один из вариантов внизу или перейдите к следующему вопросу. ( ответ : B)',
    variants: { a: 'A', b: 'B' },
    correct: 'B',
  },
  {
    id: 3,
    question:
      'Это 3-й вопрос викторины. Выберете, пожалуйста, один из вариантов внизу или перейдите к следующему вопросу. ( ответ : B)',
    variants: { a: 'A', b: 'B', c: 'C' },
    correct: 'B',
  },
  {
    id: 4,
    question:
      'Это 4-й вопрос викторины. Выберете, пожалуйста, один из вариантов внизу или перейдите к следующему вопросу. ( ответ : C)',
    variants: { a: 'A', b: 'B', c: 'C' },
    correct: 'C',
  },
  {
    id: 5,
    question:
      'Это последний вопрос викторины. Выберете, пожалуйста, один из вариантов внизу. ( ответ : А)',
    variants: { a: 'A', b: 'B' },
    correct: 'A',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const que = document.querySelector('.quiz__body-question') as HTMLDivElement;
  const next = document.querySelector('.quiz__body-next') as HTMLButtonElement;
  const correctCount = document.querySelector('.answ') as HTMLSpanElement;
  const count = document.querySelector('.que') as HTMLSpanElement;

  class Quiz {
    private score: number;
    private questions: Question[];
    current: number;

    constructor(questions: Question[]) {
      this.questions = questions;
      this.score = 0;
      this.current = 0;
    }

    getAnswer(answer: string, index: number) {
      const { correct } = this.questions.filter((el) => el.id === index)[0];

      if (correct === answer) {
        this.score++;
      }

      this.nextQuestion();
    }

    nextQuestion() {
      this.current++;
    }

    getResult() {
      return this.score;
    }
  }

  const quiz = new Quiz(questions);

  next.addEventListener('click', () => {
    quiz.nextQuestion();
    updateQuiz();
  });

  count.textContent = questions.length.toString();

  function updateQuiz() {
    const btns = document.querySelector('.quiz__body-variants') as HTMLElement;

    if (que && quiz.current < questions.length) {
      que.textContent = questions[quiz.current].question;

      btns.innerHTML = '';

      const { variants } = questions[quiz.current];
      Object.values(variants).forEach((el) => {
        const btn = document.createElement('button');
        btn.className = 'btn';

        btn.textContent = el as string;
        btns.append(btn);

        btn.addEventListener('click', () => {
          const buttons = btns.children;
          Array.from(buttons).forEach((element: any) => {
            element.setAttribute('disabled', true);
            if (element.textContent === questions[quiz.current].correct)
              element.style.backgroundColor = 'red';
          });

          quiz.getAnswer(el as string, questions[quiz.current].id);
          setTimeout(() => {
            correctCount.textContent = quiz.getResult().toString();
            updateQuiz();
          }, 2000);
        });
      });
    }

    if (quiz.current + 1 === questions.length) {
      next.textContent = 'Больше вопросов нет!';
    }

    if (quiz.current === questions.length) {
      setTimeout(() => {
        btns.innerHTML = '';
      }, 2000);
    }
  }

  updateQuiz();
});
