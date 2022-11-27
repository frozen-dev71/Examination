import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qId:0,
      title:'',
      description: '',
      category: {
        title:'',
      },
      maxMark: '',
      numberOfQuestions: ''

    }
  ];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=> {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error)=> {
        console.log(error);
        Swal.fire("Error!","Error in loading Data!","error");
      }
    );
  }

  deleteQuiz(qId:any){

    Swal.fire({
      icon: "question",
      title:"Are you sure?",
      confirmButtonText:"Delete",
      showCancelButton: true,
    }).then((result)=>{

      if (result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId);
            Swal.fire("Success","Quiz deleted","success");
          },
          (error)=> {
            Swal.fire("Error","Error on deleting","error");
          }
        );
      }
    });

  }

}
