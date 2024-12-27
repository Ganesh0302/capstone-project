using EduLink.Controllers;
using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace EduLink.Tests
{
    public class StudentsControllerTests
    {
        private readonly StudentsController _controller;
        private readonly Mock<IAssessmentRepository> _mockRepo;

        public StudentsControllerTests()
        {
            // Create a mock repository
            _mockRepo = new Mock<IAssessmentRepository>();
            // Pass the mock repository to the controller
            _controller = new StudentsController(_mockRepo.Object);
        }

        [Fact]
        public void GetAllAssessments_ReturnsOkResult_WithListOfAssessments()
        {
            // Arrange
            var assessments = new List<Assessment>
    {
        new Assessment
        {
            Id = 1,
            Title = "Math Test",
            Description = "Test on Algebra",
            Type = "Exam",
            CreatedAt = DateTime.Now,
            DueDate = DateTime.Now.AddDays(7),
            CourseId = 101
        },
        new Assessment
        {
            Id = 2,
            Title = "Science Quiz",
            Description = "Quiz on Physics",
            Type = "Quiz",
            CreatedAt = DateTime.Now,
            DueDate = DateTime.Now.AddDays(3),
            CourseId = 102
        }
    };

            _mockRepo.Setup(repo => repo.GetAll()).Returns(assessments);

            // Act
            var result = _controller.GetAllAssessments();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Assessment>>>(result);  // Assert the ActionResult type
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);  // Extract the OkObjectResult from ActionResult
            var returnValue = Assert.IsType<List<Assessment>>(okResult.Value);  // Check the actual list
            Assert.Equal(2, returnValue.Count);  // Verify the count of assessments
        }



        [Fact]
        public void AddSubmission_ValidSubmission_ReturnsOkResult()
        {
            // Arrange
            var submission = new Submission
            {
                SubmissionId = 1,
                StudentId = "S123",
                AssessmentId = 1,
                Content = "My assignment submission",
                SubmittedAt = DateTime.Now,
                Grade = null,
                Feedback = null
            };

            _mockRepo.Setup(repo => repo.AddSubmission(It.IsAny<Submission>()));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddSubmission(submission);
            Assert.NotNull(result);

        }

     



    }
}
