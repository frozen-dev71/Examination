import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  qId:any;
  questions:any;

  marksGained=0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  constructor(private locationSt: LocationStrategy, private _router: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._router.snapshot.params["qid"];
    this.loadQuestions();
  }

  loadQuestions() {
   this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
    (data:any)=>{
     this.questions = data;
     this.questions.forEach(
      (q:any)=>{
          q['givenAnswer'] = '';
      },
     );
     console.log(this.questions);
    },
    (error)=>{
      Swal.fire("Error","Error in loading questions of quiz","error");
    }
   );
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(
      ()=>{
        history.pushState(null,'',location.href);
      }
    );
  }

  submitQuiz(){
    Swal.fire(
      {
        title: 'Do you want to submit the quiz?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        icon: 'info'
      }
    ).then(
      (result)=>{
        if(result.isConfirmed){
          this.isSubmit = true;
          this.questions.forEach(
            (q:any)=>{

              if(q.givenAnswer == q.answer){
                this.correctAnswers++;
               let markSingle = this.questions[0].quiz.maxMark / this.questions.length;
               this.marksGained += markSingle;
              }
              if(q.givenAnswer.trim()!=''){
                this.attempted++;
              }
            }
          );
        }
      }
    );
  }

}
