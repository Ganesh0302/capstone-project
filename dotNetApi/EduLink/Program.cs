using EduLink.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PatientCarePortal.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ========================================
// 1. Configure Services
// ========================================

// Configure DbContext
builder.Services.AddDbContext<EduLinkContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


//doto complete missing code..

// Configure JWT settings
//doto complete missing code..
//doto complete missing code..

// Add authorization with roles 
LearnerPolicy,EducatorPolicy ,ContentCreatorPolicy


// Add controllers
builder.Services.AddControllers();

// Configure Swagger with JWT Authentication
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Edu Link Hub API", Version = "v1" });

    // Add JWT Authentication to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Enable CORS with credentials
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200") // Angular frontend URL
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // **Important**: Allow credentials
    });
});

var app = builder.Build();

// ========================================
// 2. Configure Middleware Pipeline
// ========================================

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Edu Link   API v1");
    });
}

// Enforce HTTPS (ensure frontend uses HTTPS as well if this is enabled)
app.UseHttpsRedirection();

// Enable CORS before authentication and authorization
app.UseCors("CorsPolicy");

// Enable Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();




// Map Controllers
app.MapControllers();

app.Run();
