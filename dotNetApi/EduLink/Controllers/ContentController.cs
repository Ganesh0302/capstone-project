using EduLink.Models;
using EduLink.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduLink.Controllers
{
  
    public class ContentController : ControllerBase
    {
       

        // GET: api/content
        [HttpGet]
        public ActionResult<IEnumerable<Content>> GetAllContents()
        {
            //todo: Complete missing code
        }

        // GET: api/content/{id}
        [HttpGet("{id}")]
        public ActionResult<Content> GetContentById(int id)
        {
            //todo: Complete missing code
        }

        // POST: api/content
        [HttpPost]
        public ActionResult<Content> AddContent(Content content)
        {
          //todo: Complete missing code
        }

        // PUT: api/content/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateContent(int id, Content content)
        {
         //todo: Complete missing code
        }

        // DELETE: api/content/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteContent(int id)
        {
    //todo: Complete missing code
        }
    }
}
