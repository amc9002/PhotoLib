using System.Collections.Generic;

namespace TestTask.Models
{
    public class Tag
    {
        public long TagId { get; set; }
        public string TagName { get; set; }
        public IList<ImageTag> ImageTags { get; set; }

    }

}
