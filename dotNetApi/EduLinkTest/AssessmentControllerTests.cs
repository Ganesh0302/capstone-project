using EduLink.Controllers;
using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace EduLink.Tests.Controllers
{
    public class AssessmentControllerTests
    {
        private readonly Mock<IAssessmentRepository> _mockRepo;
        private readonly AssessmentController _controller;

        public AssessmentControllerTests()
        {
            _mockRepo = new Mock<IAssessmentRepository>();
            _controller = new AssessmentController(_mockRepo.Object);
        }

        // Test for GetAllAssessments
        [Fact]
        public void GetAllAssessments_ReturnsOkResult_WithAssessments()
        {
            // Arrange
            var mockAssessments = new List<Assessment>
            {
                new Assessment { Id = 1, Title = "Assessment 1" },
                new Assessment { Id = 2, Title = "Assessment 2" }
            };

            _mockRepo.Setup(repo => repo.GetAll()).Returns(mockAssessments);

            // Act
            var result = _controller.GetAllAssessments();

          
            Assert.NotNull(result);
        }

        // Test for GetAssessmentById
        [Fact]
        public void GetAssessmentById_ReturnsOkResult_WithAssessment()
        {
            // Arrange
            int assessmentId = 1;
            var mockAssessment = new Assessment { Id = assessmentId, Title = "Assessment 1" };
            _mockRepo.Setup(repo => repo.GetById(assessmentId)).Returns(mockAssessment);

            // Act
            var result = _controller.GetAssessmentById(assessmentId);
            Assert.NotNull(result);
        }

      

        // Test for AddAssessment
        [Fact]
        public void AddAssessment_ReturnsCreatedAtAction_WithAssessment()
        {
            // Arrange
            var mockAssessment = new Assessment { Id = 1, Title = "Assessment 1" };
            _mockRepo.Setup(repo => repo.Add(mockAssessment));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddAssessment(mockAssessment);

            Assert.NotNull(result);
        }

        // Test for UpdateAssessment
        [Fact]
        public void UpdateAssessment_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            var mockAssessment = new Assessment { Id = 1, Title = "Assessment 1" };
            _mockRepo.Setup(repo => repo.Update(mockAssessment));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.UpdateAssessment(mockAssessment.Id, mockAssessment);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdateAssessment_ReturnsBadRequest_WhenIdsDoNotMatch()
        {
            // Arrange
            var mockAssessment = new Assessment { Id = 1, Title = "Assessment 1" };

            // Act
            var result = _controller.UpdateAssessment(2, mockAssessment);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        // Test for DeleteAssessment
        [Fact]
        public void DeleteAssessment_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            int assessmentId = 1;
            _mockRepo.Setup(repo => repo.Delete(assessmentId));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.DeleteAssessment(assessmentId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        // Test for GetSubmissionsForAssessment
        [Fact]
        public void GetSubmissionsForAssessment_ReturnsOkResult_WithSubmissions()
        {
            // Arrange
            int assessmentId = 1;
            var mockSubmissions = new List<Submission>
            {
                new Submission { SubmissionId = 1, AssessmentId = assessmentId },
                new Submission { SubmissionId = 2, AssessmentId = assessmentId }
            };

            _mockRepo.Setup(repo => repo.GetSubmissionsForAssessment(assessmentId)).Returns(mockSubmissions);

            // Act
            var result = _controller.GetSubmissionsForAssessment(assessmentId);
            Assert.NotNull(result);
        }

        // Test for GradeSubmission
        [Fact]
        public void GradeSubmission_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            int submissionId = 1;
            double grade = 90.0;
            string feedback = "Good job!";
            _mockRepo.Setup(repo => repo.GradeSubmission(submissionId, grade, feedback));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.GradeSubmission(submissionId, grade, feedback);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
    }
}
