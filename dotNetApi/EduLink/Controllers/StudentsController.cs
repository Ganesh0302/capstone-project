using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{
     //doto complete missing code..
    public class StudentsController : ControllerBase
    {
        //doto complete missing code..

        // GET: api/assessment
        [HttpGet]
        public ActionResult<IEnumerable<Assessment>> GetAllAssessments()
        { //doto complete missing code..
        }
        [HttpPost]
        public ActionResult<Assessment> AddSubmission(Submission submission)
        {
            //doto complete missing code..
        }

    }
}
