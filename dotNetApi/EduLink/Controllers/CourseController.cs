using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{
   
    public class CourseController : ControllerBase
    {
       

        // GET: api/course
        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetAllCourses()
        {
            //todo: Complete missing code
        }

        // GET: api/course/{id}
        [HttpGet("{id}")]
        public ActionResult<Course> GetCourseById(int id)
        {
            //todo: Complete missing code
        }

        // POST: api/course
        [HttpPost]
        public ActionResult<Course> AddCourse(Course course)
        {
            //todo: Complete missing code
        }

        // PUT: api/course/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCourse(int id, Course course)
        {
            //todo: Complete missing code
        }

        // DELETE: api/course/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id)
        {
            //todo: Complete missing code
        }
    }
}
