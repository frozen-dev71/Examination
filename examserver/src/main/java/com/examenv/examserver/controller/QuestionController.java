package com.examenv.examserver.controller;

import com.examenv.examserver.model.exam.Question;
import com.examenv.examserver.model.exam.Quiz;
import com.examenv.examserver.service.QuestionService;
import com.examenv.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    // get all questions
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid){
        /*
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
         */
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }




    //get single question
    @GetMapping("/{questionId}")
    public Question get(@PathVariable("questionId") Long questionId){
        return this.questionService.getQuestion(questionId);
    }

    //delete question
    @DeleteMapping("/{questionId}")
    public void delete(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }


    //evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        double marksGained=0;
        int correctAnswers = 0;
        int attempted = 0;
       for(Question q: questions){
           Question question = this.questionService.get(q.getQuestionId());
           if(question.getAnswer().equals(q.getGivenAnswer().trim())){
               //correct
               correctAnswers++;
               double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMark()) / questions.size();
               marksGained += marksSingle;
           }
           if(q.getGivenAnswer() != null){
               attempted++;
           }
       }

        Map<String, Object> map = Map.of("marksGained",marksGained,"correctAnswers",correctAnswers,"attempted",attempted);
        return ResponseEntity.ok(map);
    }

}
