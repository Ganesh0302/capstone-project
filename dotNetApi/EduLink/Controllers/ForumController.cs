using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
       //doto complete missing code..

        // GET: api/forum/posts/{courseId}
        [HttpGet("posts/{courseId}")]
        public ActionResult<IEnumerable<ForumPost>> GetAllPosts(int courseId)
        {
           //doto complete missing code..
        }

        // GET: api/forum/post/{id}
        [HttpGet("post/{id}")]
        public ActionResult<ForumPost> GetPostById(int id)
        {
       //doto complete missing code..
        }

        // POST: api/forum/post
        [HttpPost("post")]
        public ActionResult AddPost([FromBody] ForumPost post)
        {
         //doto complete missing code..
        }

        // POST: api/forum/reply
        [HttpPost("reply")]
        public ActionResult AddReply([FromBody] ForumReply reply)
        {
           //doto complete missing code..
        }

        // GET: api/forum/feedbacks/{courseId}
        [HttpGet("feedbacks/{courseId}")]
        public ActionResult<IEnumerable<Feedback>> GetAllFeedbacks(int courseId)
        {
          //doto complete missing code..
        }

        // POST: api/forum/feedback
        [HttpPost("feedback")]
        public ActionResult AddFeedback([FromBody] Feedback feedback)
        {
            //doto complete missing code..
        }
        // GET: api/course
        [HttpGet("GetAllCourses")]
        public ActionResult<IEnumerable<Course>> GetAllCourses()
        {
          //doto complete missing code..
        }
    }
}
