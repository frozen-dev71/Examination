import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId:any;
  qTitle:any;
  question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };


  constructor(private _route:ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params["qid"];
    this.qTitle = this._route.snapshot.params["title"];
    this.question.quiz['qId'] = this.qId;
  }

  submitData(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null){
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null){
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success","Question has been added.","success");
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error)=>{
        Swal.fire("Error","Error on adding question.","error");
      }
    );
  }

}
