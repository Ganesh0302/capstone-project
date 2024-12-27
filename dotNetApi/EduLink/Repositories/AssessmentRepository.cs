using EduLink.Models;
using Microsoft.EntityFrameworkCore;
using PatientCarePortal.Models;
using System.Xml.Schema;

namespace EduLink.Repository
{
    public class AssessmentRepository
    {
       

        public IEnumerable<Assessment> GetAll()
        {
            //todo: Complete missing code
        }

        public Assessment GetById(int id)
        {
            //todo: Complete missing code
        }

        public void Add(Assessment assessment)
        {
            //todo: Complete missing code
         
        }

        public void Update(Assessment assessment)
        {
            //todo: Complete missing code
        }

        public void Delete(int id)
        {
            //todo: Complete missing code
        }

        public IEnumerable<Submission> GetSubmissionsForAssessment(int assessmentId)
        {
            //todo: Complete missing code
        }

        public void GradeSubmission(int submissionId, double grade, string feedback)
        {
            //todo: Complete missing code
        }
        public void AddSubmission(Submission submission)
        {
            //todo: Complete missing code
        }
        public bool SaveChanges()
        {
            //todo: Complete missing code
        }

      

    }
}
