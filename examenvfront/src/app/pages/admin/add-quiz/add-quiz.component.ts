import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
    cId: "0",
    title: "default",
    }
  ];

  quizData = {
    title: '',
    description:'',
    maxMark: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: '',
    }
  };

  constructor(private _cat:CategoryService, private _snack: MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=> {
        this.categories = data;
        console.log(this.categories);
      },
      (error)=> {
        console.log(error);
        Swal.fire("Error!","Error in loading data","error");
      }
    );
  }

  addQuiz(){
    if (this.quizData.title.trim() == '' || this.quizData.title == null){
      this._snack.open("Title Required","OK",{
        duration: 2500
      });
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any)=> {
        Swal.fire("Succesfull","Quiz has been added","success");
        this.quizData = {
          title: '',
          description:'',
          maxMark: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cId: '',
          }
        };
      },
      (error)=>{
        Swal.fire("Error","Error while adding the quiz","error");
      }
    );

  }

}
