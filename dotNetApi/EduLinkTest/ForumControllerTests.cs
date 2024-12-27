using EduLink.Controllers;
using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduLinkTetst
{
    public class ForumControllerTests
    {
        private readonly ForumController _controller;
        private readonly Mock<IForumRepository> _mockRepo;

        public ForumControllerTests()
        {
            _mockRepo = new Mock<IForumRepository>();
            _controller = new ForumController(_mockRepo.Object);
        }
        [Fact]
        public void GetAllPosts_ReturnsOkResult_WithPosts()
        {
            // Arrange
            int courseId = 1;
            var mockPosts = new List<ForumPost>
    {
        new ForumPost { Id = 1, Title = "Test Post 1", CourseId = courseId },
        new ForumPost { Id = 2, Title = "Test Post 2", CourseId = courseId }
    };

            _mockRepo.Setup(repo => repo.GetAllPosts(courseId)).Returns(mockPosts);

            // Act
            var result = _controller.GetAllPosts(courseId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<ForumPost>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }
        [Fact]
        public void GetAllPosts_ReturnsOkResult_WithEmptyList()
        {
            // Arrange
            int courseId = 1;
            _mockRepo.Setup(repo => repo.GetAllPosts(courseId)).Returns(new List<ForumPost>());

            // Act
            var result = _controller.GetAllPosts(courseId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<ForumPost>>(okResult.Value);
            Assert.Empty(returnValue);
        }
        [Fact]
        public void GetPostById_ReturnsOkResult_WithPost()
        {
            // Arrange
            int postId = 1;
            var mockPost = new ForumPost { Id = postId, Title = "Test Post" };
            _mockRepo.Setup(repo => repo.GetPostById(postId)).Returns(mockPost);

            // Act
            var result = _controller.GetPostById(postId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<ForumPost>(okResult.Value);
            Assert.Equal(postId, returnValue.Id);
        }
        [Fact]
        public void GetPostById_ReturnsNotFound_WhenPostDoesNotExist()
        {
            // Arrange
            int postId = 1;
            _mockRepo.Setup(repo => repo.GetPostById(postId)).Returns((ForumPost)null);

            // Act
            var result = _controller.GetPostById(postId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
        [Fact]
        public void AddPost_ReturnsOk_WhenPostIsAddedSuccessfully()
        {
            // Arrange
            var newPost = new ForumPost { Id = 1, Title = "New Post", Content = "Test Content" };
            _mockRepo.Setup(repo => repo.AddPost(newPost));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddPost(newPost);

            // Assert
            Assert.IsType<OkResult>(result);
        }
        [Fact]
        public void AddPost_ReturnsBadRequest_WhenSaveFails()
        {
            // Arrange
            var newPost = new ForumPost { Id = 1, Title = "New Post", Content = "Test Content" };
            _mockRepo.Setup(repo => repo.AddPost(newPost));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(false);

            // Act
            var result = _controller.AddPost(newPost);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Could not add post.", badRequestResult.Value);
        }
        [Fact]
        public void AddReply_ReturnsOk_WhenReplyIsAddedSuccessfully()
        {
            // Arrange
            var newReply = new ForumReply { Id = 1, ForumPostId = 1, Content = "Reply Content" };
            _mockRepo.Setup(repo => repo.AddReply(newReply));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddReply(newReply);

            // Assert
            Assert.IsType<OkResult>(result);
        }
        [Fact]
        public void AddFeedback_ReturnsOk_WhenFeedbackIsAddedSuccessfully()
        {
            // Arrange
            var newFeedback = new Feedback { Id = 1, CourseId = 1, Comments = "Great Course" };
            _mockRepo.Setup(repo => repo.AddFeedback(newFeedback));
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddFeedback(newFeedback);

            // Assert
            Assert.IsType<OkResult>(result);
        }





    }
}
