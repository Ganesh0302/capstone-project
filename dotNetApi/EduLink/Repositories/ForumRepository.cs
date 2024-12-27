using EduLink.Models;
using Microsoft.EntityFrameworkCore;
using PatientCarePortal.Models;

namespace EduLink.Repository
{
    public class ForumRepository : IForumRepository
    {
       //doto complete missing code..

        public IEnumerable<ForumPost> GetAllPosts(int courseId)
        {
         //doto complete missing code..

        }

        public ForumPost GetPostById(int id)
        {
          //doto complete missing code..
        }

        public void AddPost(ForumPost post)
        {
           //doto complete missing code..
        }

        public void AddReply(ForumReply reply)
        {
           //doto complete missing code..
        }

        public bool SaveChanges()
        {
          //doto complete missing code..
        }
        public IEnumerable<Feedback> GetAllFeedbacks(int courseId)
        {
            //doto complete missing code..
        }

        public void AddFeedback(Feedback feedback)
        {
            //doto complete missing code..
        }
        public IEnumerable<Course> GetAllCourses()
        {
            //doto complete missing code..
        }
    }
}
