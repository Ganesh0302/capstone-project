using System.ComponentModel.DataAnnotations;

namespace EduLink.Models
{
    public class Feedback
    {
        [Key]
        //You have to create these properties for this class
        // int Id
        // string? StudentId  // Link to Student/User
        // int? CourseId  // Feedback related to a course
        // string? Comments // Actual feedback
        // DateTime? SubmittedAt
        // int? Rating  // Rating (e.g., 1 to 5 stars)
       
    }
}
