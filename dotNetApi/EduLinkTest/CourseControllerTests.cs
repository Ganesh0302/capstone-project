using EduLink.Controllers;
using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace EduLink.Tests
{
    public class CourseControllerTests
    {
        private readonly CourseController _controller;
        private readonly Mock<ICourseRepository> _mockRepo;

        public CourseControllerTests()
        {
            _mockRepo = new Mock<ICourseRepository>();
            _controller = new CourseController(_mockRepo.Object);
        }

        // Test for GetAllCourses
        [Fact]
        public void GetAllCourses_ReturnsOkResult_WithCourses()
        {
            // Arrange
            var mockCourses = new List<Course>
    {
        new Course { Id = 1, Title = "Course 1" },
        new Course { Id = 2, Title = "Course 2" }
    };

            _mockRepo.Setup(repo => repo.GetAllCourses()).Returns(mockCourses);

            // Act
            var result = _controller.GetAllCourses();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Course>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<Course>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }




     

        // Test for AddCourse
        [Fact]
        public void AddCourse_ReturnsCreatedAtAction_WhenCourseIsAdded()
        {
            // Arrange
            var newCourse = new Course { Id = 1, Title = "New Course" };
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);
            _mockRepo.Setup(repo => repo.AddCourse(newCourse));

            // Act
            var result = _controller.AddCourse(newCourse);
            Assert.NotNull(result);
        }

     

        // Test for UpdateCourse
        [Fact]
        public void UpdateCourse_ReturnsNoContent_WhenCourseIsUpdated()
        {
            // Arrange
            int courseId = 1;
            var updatedCourse = new Course { Id = courseId, Title = "Updated Course" };
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);
            _mockRepo.Setup(repo => repo.UpdateCourse(updatedCourse));

            // Act
            var result = _controller.UpdateCourse(courseId, updatedCourse);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdateCourse_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            int courseId = 1;
            var updatedCourse = new Course { Id = 2, Title = "Updated Course" };

            // Act
            var result = _controller.UpdateCourse(courseId, updatedCourse);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        // Test for DeleteCourse
        [Fact]
        public void DeleteCourse_ReturnsNoContent_WhenCourseIsDeleted()
        {
            // Arrange
            int courseId = 1;
            var existingCourse = new Course { Id = courseId, Title = "Existing Course" };
            _mockRepo.Setup(repo => repo.GetCourseById(courseId)).Returns(existingCourse);
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);
            _mockRepo.Setup(repo => repo.DeleteCourse(existingCourse));

            // Act
            var result = _controller.DeleteCourse(courseId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void DeleteCourse_ReturnsNotFound_WhenCourseDoesNotExist()
        {
            // Arrange
            int courseId = 1;
            _mockRepo.Setup(repo => repo.GetCourseById(courseId)).Returns((Course)null);

            // Act
            var result = _controller.DeleteCourse(courseId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
