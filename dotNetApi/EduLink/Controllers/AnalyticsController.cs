using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
       

       

        // GET: api/analytics/course/{courseId}/progress
        [HttpGet("course/progress/{courseId}")]
        public ActionResult<IEnumerable<StudentProgress>> GetCourseProgress(int courseId)
        {
            //todo: Complete missing code
        }

        // GET: api/analytics/course/{courseId}/engagement
        [HttpGet("course/engagement/{courseId}")]
        public ActionResult<EngagementMetrics> GetEngagementMetrics(int courseId)
        {
            //todo: Complete missing code
        }

        // GET: api/analytics/course/{courseId}/feedback
        [HttpGet("course/feedback/{courseId}")]
        public ActionResult<IEnumerable<Feedback>> GetCourseFeedback(int courseId)
        {
            //todo: Complete missing code
        }
    }
}
