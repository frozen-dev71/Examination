import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz: QuizService, private _categories: CategoryService, private _router: Router) { }

  qId = 0;
  quiz= {
    title: '',
    description:'',
    maxMark: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: '',
    }
  };
  categories=[
    {
    cId: "0",
    title: "default",
    }
  ];

  ngOnInit(): void {
   this.qId = this._route.snapshot.params["qid"];
   this._quiz.getQuiz(this.qId).subscribe(
    (data:any)=>{
      this.quiz = data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
    }
   );

   this._categories.categories().subscribe(
    (data: any)=> {
      this.categories = data;
    },
    (error)=>{
      console.log(error);
    }
   );
  }


  //update form submit
  public updateData(){

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success","Quiz Updated","success").then(
          (e)=>{
            this._router.navigate(['/admin/quizzes']);
          }
          );
      },
      (error)=>{
        Swal.fire("Error","Error when updating Data","error");
      }
    );


  }

}
