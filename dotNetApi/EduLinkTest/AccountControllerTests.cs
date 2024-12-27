
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using NetBankAPI.Models;
using EduLink.Repository;
using HotelierHub.Controllers;

public class AccountControllerTests
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IConfiguration> _mockConfiguration;
    private readonly AccountController _controller;

    public AccountControllerTests()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _mockConfiguration = new Mock<IConfiguration>();

        _controller = new AccountController(_mockUserRepository.Object, _mockConfiguration.Object);
    }

  
    [Fact]
    public async Task UsersByRole_Authorized_ReturnsOkResult()
    {
        // Arrange: Simulate a valid JWT token scenario
        var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, "testuser"),
        new Claim(ClaimTypes.Role, "Guest") // Valid role
    };

        var identity = new ClaimsIdentity(claims, "TestAuthType");
        var claimsPrincipal = new ClaimsPrincipal(identity);

        var controllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = claimsPrincipal // Attach valid claims
            }
        };

        _controller.ControllerContext = controllerContext;

        var usersList = new List<User>
    {
        new User { UserId = 1, Username = "testuser", Role = "Guest" }
    };

        _mockUserRepository.Setup(repo => repo.UsersByRole("Guest")).ReturnsAsync(usersList);

        // Act
        var result = await _controller.UsersByRole("Guest");

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<List<User>>(okResult.Value);
        Assert.Single(returnValue);
    }

}
