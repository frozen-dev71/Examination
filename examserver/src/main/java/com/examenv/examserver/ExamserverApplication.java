package com.examenv.examserver;

import com.examenv.examserver.model.Role;
import com.examenv.examserver.model.User;
import com.examenv.examserver.model.UserRole;
import com.examenv.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code");

		User user = new User();

		user.setFirstName("Berk");
		user.setLastName("Beleli");
		user.setUsername("berkbeleli");
		user.setPassword(this.bCryptPasswordEncoder.encode("1234"));
		user.setEmail("berk@mail.com");
		user.setProfile("default.png");

		Role role1 = new Role();
		role1.setRoleId(55l);
		role1.setRoleName("ADMIN");

		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole = new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);

		userRoleSet.add(userRole);
		User user1 = this.userService.createUser(user, userRoleSet);
		System.out.println(user1.getUsername());

	}
}
