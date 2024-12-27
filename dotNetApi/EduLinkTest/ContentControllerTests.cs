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
    public class ContentControllerTests
    {
        private readonly Mock<IContentRepository> _mockRepo;
        private readonly ContentController _controller;

        public ContentControllerTests()
        {
            _mockRepo = new Mock<IContentRepository>();
            _controller = new ContentController(_mockRepo.Object);
        }

        // Test for GetAllContents
        [Fact]
        public void GetAllContents_ReturnsOkResult_WithContents()
        {
            // Arrange
            var mockContents = new List<Content>
            {
                new Content { Id = 1, Title = "Content 1" },
                new Content { Id = 2, Title = "Content 2" }
            };

            _mockRepo.Setup(repo => repo.GetAll()).Returns(mockContents);

            // Act
            var result = _controller.GetAllContents();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Content>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<Content>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        // Test for GetContentById
        [Fact]
        public void GetContentById_ReturnsOkResult_WithContent()
        {
            // Arrange
            int contentId = 1;
            var mockContent = new Content { Id = contentId, Title = "Content 1" };
            _mockRepo.Setup(repo => repo.GetById(contentId)).Returns(mockContent);

            // Act
            var result = _controller.GetContentById(contentId);

            Assert.NotNull(result);
        }

      

        // Test for AddContent
        [Fact]
        public void AddContent_ReturnsCreatedAtAction_WhenContentIsAdded()
        {
            // Arrange
            var content = new Content { Id = 1, Title = "New Content" };
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.AddContent(content);

            Assert.NotNull(result);
        }

        // Test for UpdateContent
        [Fact]
        public void UpdateContent_ReturnsNoContent_WhenContentIsUpdated()
        {
            // Arrange
            int contentId = 1;
            var content = new Content { Id = contentId, Title = "Updated Content" };
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.UpdateContent(contentId, content);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdateContent_ReturnsBadRequest_WhenIdsDoNotMatch()
        {
            // Arrange
            int contentId = 1;
            var content = new Content { Id = 2 };

            // Act
            var result = _controller.UpdateContent(contentId, content);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        // Test for DeleteContent
        [Fact]
        public void DeleteContent_ReturnsNoContent_WhenContentIsDeleted()
        {
            // Arrange
            int contentId = 1;
            _mockRepo.Setup(repo => repo.SaveChanges()).Returns(true);

            // Act
            var result = _controller.DeleteContent(contentId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
    }
}
