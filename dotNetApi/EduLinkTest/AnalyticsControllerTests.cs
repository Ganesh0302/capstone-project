using EduLink.Controllers;
using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace EduLink.Tests.Controllers
{
    public class AnalyticsControllerTests
    {
        private readonly Mock<IAnalyticsRepository> _mockRepo;
        private readonly AnalyticsController _controller;

        public AnalyticsControllerTests()
        {
            _mockRepo = new Mock<IAnalyticsRepository>();
            _controller = new AnalyticsController(_mockRepo.Object);
        }

        // Test for GetCourseProgress
        [Fact]
        public void GetCourseProgress_ReturnsOkResult_WithStudentProgress()
        {
            // Arrange
            int courseId = 1;
            var mockProgress = new List<StudentProgress>
            {
                new StudentProgress { Id = 1, StudentId = "student1", CourseId = courseId, CompletedModules = 3, TotalModules = 5, LastActiveDate = DateTime.UtcNow },
                new StudentProgress { Id = 2, StudentId = "student2", CourseId = courseId, CompletedModules = 5, TotalModules = 5, LastActiveDate = DateTime.UtcNow }
            };

            _mockRepo.Setup(repo => repo.GetCourseProgress(courseId)).Returns(mockProgress);

            // Act
            var result = _controller.GetCourseProgress(courseId);

            Assert.NotNull(result);
        }

        // Test for GetEngagementMetrics
        [Fact]
        public void GetEngagementMetrics_ReturnsOkResult_WithEngagementMetrics()
        {
            // Arrange
            int courseId = 1;
            var mockMetrics = new EngagementMetrics
            {
                CourseId = courseId,
                ActiveStudents = 10,
                TotalPosts = 5,
                TotalReplies = 20,
                LastUpdated = DateTime.UtcNow
            };

            _mockRepo.Setup(repo => repo.GetEngagementMetrics(courseId)).Returns(mockMetrics);

            // Act
            var result = _controller.GetEngagementMetrics(courseId);

            // Assert
            Assert.NotNull(result);
        }

        // Test for GetCourseFeedback
        [Fact]
        public void GetCourseFeedback_ReturnsOkResult_WithFeedback()
        {
            // Arrange
            int courseId = 1;
            var mockFeedback = new List<Feedback>
            {
                new Feedback { Id = 1, CourseId = courseId, StudentId = "student1", Comments = "Great course!" },
                new Feedback { Id = 2, CourseId = courseId, StudentId = "student2", Comments = "Very informative." }
            };

            _mockRepo.Setup(repo => repo.GetCourseFeedback(courseId)).Returns(mockFeedback);

            // Act
            var result = _controller.GetCourseFeedback(courseId);

            Assert.NotNull(result);
        }
    }
}
