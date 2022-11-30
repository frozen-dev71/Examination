import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getQuestionsOfQuizForTest(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }


  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`, question);
  }


  // delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }


  // evaluate quiz
  public evaluateQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }
}
