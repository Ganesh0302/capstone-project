using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{

    public class AssessmentController : ControllerBase
    {
     


        // GET: api/assessment
        [HttpGet]
        public ActionResult<IEnumerable<Assessment>> GetAllAssessments()
        {
            //todo: Complete missing code
        }

        // GET: api/assessment/{id}
        [HttpGet("{id}")]
        public ActionResult<Assessment> GetAssessmentById(int id)
        {
            //todo: Complete missing code
        }

        // POST: api/assessment
        [HttpPost]
        public ActionResult<Assessment> AddAssessment(Assessment assessment)
        {
            //todo: Complete missing code
        }

        // PUT: api/assessment/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateAssessment(int id, Assessment assessment)
        {
            //todo: Complete missing code
        }

        // DELETE: api/assessment/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteAssessment(int id)
        {
            //todo: Complete missing code
        }

        // GET: api/assessment/{id}/submissions
        [HttpGet("{id}/submissions")]
        public ActionResult<IEnumerable<Submission>> GetSubmissionsForAssessment(int id)
        {
            //todo: Complete missing code
        }

        // POST: api/assessment/grade
        [HttpPost("GradeSubmission/{submissionId},{grade},{feedback}")]
        public ActionResult GradeSubmission(int submissionId, double grade, string feedback)
        {
            //todo: Complete missing code
        }
    }
}
