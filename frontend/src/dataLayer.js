/* eslint-disable class-methods-use-this */
import API from './api';
// global.fetch = require('node-fetch');

class Utilities {
  constructor(baseURL) {
    this.requestDefault = { headers: { 'Content-Type': 'application/json', Authorization: null } };
    this.baseURL = baseURL;
    this.requestDefault.headers.Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    this.APIBackend = new API(this.baseURL);
  }

  adminRegister(email, name, password) {
    return new Promise((resolve, reject) => {
      const body = { password, email, name };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'POST';
      this.APIBackend.request('admin/auth/register', requestParams)
        .then((response) => {
          localStorage.setItem('token', `Bearer ${response.token}`);
          localStorage.setItem('email', email);
          this.requestDefault.headers.Authorization = `Bearer ${response.token}`;
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  /*
  adminRegister( { email, name, password }){
      return this.adminRegister(email, name, password);
  }
  */

  adminLogin(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !password) reject(new Error('Either your email or password is empty. Please provide both'));

      const body = { email, password };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'POST';
      this.APIBackend.request('admin/auth/login', requestParams)
        .then((response) => {
          localStorage.setItem('token', `Bearer ${response.token}`);
          localStorage.setItem('email', email);
          this.requestDefault.headers.Authorization = `Bearer ${response.token}`;
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  /*
  adminLogin( { email, password } ){
      return this.adminLogin(email, password);
  }
  */

  adminLogout() {
    return new Promise((resolve, reject) => {
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'POST';
      this.APIBackend.request('admin/auth/logout', requestParams)
        .then((response) => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          delete this.requestDefault.headers.Authorization;
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  isLoggedIn() {
    return (localStorage.getItem('token') !== null);
  }

  getQuizzes() {
    return new Promise((resolve, reject) => {
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request('admin/quiz', requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  getQuiz(quizId) {
    return new Promise((resolve, reject) => {
      if (!quizId) reject(new Error('No Quiz ID'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`admin/quiz/${quizId}`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  createQuiz(name) {
    return new Promise((resolve, reject) => {
      const body = { name };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'POST';
      this.APIBackend.request('admin/quiz/new', requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  editQuiz(quizId, name, thumbnail, questions = []) {
    return new Promise((resolve, reject) => {
      // if (!questions || questions.length === 0) reject(new Error('No Quiz questions'));
      const body = { name, thumbnail, questions };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'PUT';
      this.APIBackend.request(`admin/quiz/${quizId}`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  deleteQuiz(quizId) {
    return new Promise((resolve, reject) => {
      if (!quizId) reject(new Error('No Quiz ID'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'DELETE';
      this.APIBackend.request(`admin/quiz/${quizId}`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  startQuizGame(quizId) {
    return new Promise((resolve, reject) => {
      if (!quizId) reject(new Error('No Quiz ID'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'POST';
      this.APIBackend.request(`admin/quiz/${quizId}/start`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  endQuizGame(quizId) {
    return new Promise((resolve, reject) => {
      if (!quizId) reject(new Error('No Quiz ID'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'POST';
      this.APIBackend.request(`admin/quiz/${quizId}/end`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  advanceQuizToNextQuestion(quizId) {
    return new Promise((resolve, reject) => {
      if (!quizId) reject(new Error('No Quiz ID'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'POST';
      this.APIBackend.request(`admin/quiz/${quizId}/advance`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  getSessionStatus(sessionId) {
    return new Promise((resolve, reject) => {
      if (!sessionId) reject(new Error('No sessionId'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`admin/session/${sessionId}/status`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  getSessionResults(sessionId) {
    return new Promise((resolve, reject) => {
      if (!sessionId) reject(new Error('No sessionId'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`admin/session/${sessionId}/results`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  joinSession(name, sessionId) {
    return new Promise((resolve, reject) => {
      if (!sessionId) reject(new Error('No sessionId'));
      const body = { name };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'POST';
      this.APIBackend.request(`play/join/${sessionId}`, requestParams)
        .then((response) => {
          resolve(response);
          localStorage.setItem('playerName', name);
        })
        .catch((err) => { reject(err); });
    });
  }

  getQuestionForPlayer(playerId) {
    return new Promise((resolve, reject) => {
      if (!playerId) reject(new Error('No playerId'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`play/${playerId}/question`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  getAnswerForPlayer(playerId) {
    return new Promise((resolve, reject) => {
      if (!playerId) reject(new Error('No playerId'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`play/${playerId}/answer`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  answerQuestionForPlayer(playerId, answerIds) {
    return new Promise((resolve, reject) => {
      if (!playerId || !answerIds || answerIds.length === 0) reject(new Error('No playerId or answerIds'));
      const body = { answerIds: [answerIds] };
      const requestParams = { ...this.requestDefault };
      requestParams.body = JSON.stringify(body);
      requestParams.method = 'PUT';

      this.APIBackend.request(`play/${playerId}/answer`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }

  getPlayerPostSessionResults(playerId) {
    return new Promise((resolve, reject) => {
      if (!playerId) reject(new Error('No playerId'));
      const requestParams = { ...this.requestDefault };
      requestParams.method = 'GET';
      this.APIBackend.request(`play/${playerId}/results`, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { reject(err); });
    });
  }
}

// module.exports.Utilities = Utilities;
export default Utilities;
