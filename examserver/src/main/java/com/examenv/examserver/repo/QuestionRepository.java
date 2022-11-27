package com.examenv.examserver.repo;

import com.examenv.examserver.model.exam.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
