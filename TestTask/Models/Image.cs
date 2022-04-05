using System;

namespace TestTask
{
    public class Image
    {
        public long Id { get; set; }
        public string Src { get; set; }
        public byte[] BitImg { get; set; }
        public string Descr { get; set; }
        public string Exif { get; set; }
    } 
}
