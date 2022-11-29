import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(qId: any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }


  //get single quiz
  public getQuiz(qId: any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz: any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cId:any){
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }

  //get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cId:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }

}
