using System.Collections.Generic;

namespace TestTask.Models
{
    public class Tag
    {
        public long tagId { get; set; }
        public string tagName { get; set; }
        public virtual IList<Image> Images { get; set; }

    }

}
