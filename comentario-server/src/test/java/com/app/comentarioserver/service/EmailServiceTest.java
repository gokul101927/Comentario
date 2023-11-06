package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.pojo.Token;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class EmailServiceTest {

    @InjectMocks
    private EmailService emailService;

    @Mock
    private JavaMailSender mailSender;

    @Test
    void test_send_email() {
        String to = "user@example.com";
        String subject = "Yay, your feedback is considered!";
        String htmlContent = """
                <html>
                <body>
                <h1>Html content<h1>
                </body>
                </html>""";

        MimeMessage mockMimeMessage = Mockito.mock(MimeMessage.class);
        Mockito.when(mailSender.createMimeMessage()).thenReturn(mockMimeMessage);

        emailService.sendEmail(to, subject, htmlContent);

        Mockito.verify(mailSender).send(mockMimeMessage);
    }
}