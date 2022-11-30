import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any;

  constructor(private _router: ActivatedRoute, private _quiz: QuizService, private _route:Router) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.params["qid"];

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
      },
      (error)=>{{
        console.log(error);
      }}
    );
  }

  startQuiz(){
    Swal.fire(
      {
        title: 'Do you want to start the quiz?',
        showCancelButton: true,
        confirmButtonText: 'Start',
        denyButtonText: `Don't Start`,
        icon: 'info'
      }
    ).then(
      (result)=>{
        if(result.isConfirmed){
         this._route.navigate(['/start/'+this.qId]);
        }else{
          Swal.fire("Denied","OK","warning");
        }
      }
    );
  }

}
