import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId:any;
  qTitle:any;
  questions = [
    {
    questionId: '',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    }
  ];

  constructor(private _route:ActivatedRoute, private _question: QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params["qid"];
    this.qTitle = this._route.snapshot.params["title"];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Do you really want to delete this question?',
    }).then(
      (result)=>{
        if(result.isConfirmed){
          this._question.deleteQuestion(questionId).subscribe(
            (data)=>{
                this._snack.open("Question Deleted","OK",{
                  duration: 2500,
                });
                this.questions = this.questions.filter((q)=>q.questionId != questionId);
            },
            (error)=>{
              this._snack.open("Error on deleting question","OK",{
                duration:2500
              });
            }
          );
        }
      }
    );
  }

}
