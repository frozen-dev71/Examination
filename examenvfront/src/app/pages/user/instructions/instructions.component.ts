import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any;

  constructor(private _router: ActivatedRoute, private _quiz: QuizService) { }

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

}
