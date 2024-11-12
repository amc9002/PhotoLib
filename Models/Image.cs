using System.Collections.Generic;

namespace TestTask.Models
{
    public class Image
    {
        public long ImageId { get; set; }
        public string Src { get; set; }
        public byte[] BitImg { get; set; }
        public string Descr { get; set; }
        public string Exif { get; set; }
        public IList<ImageTag> ImageTags { get; set; }

    } 

}
