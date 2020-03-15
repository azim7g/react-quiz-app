const host = 'https://react-quiz-76286.firebaseio.com';

export default {
    quizzes: () => [host, 'quizzes.json/'].join('/'),
    quiz: (id) => [host, 'quizzes', `${id}.json`].join('/')
}