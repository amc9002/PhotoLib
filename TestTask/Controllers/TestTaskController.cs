using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestTask.Models;

namespace TestTask.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestTaskController : ControllerBase
    {
        private readonly ILogger<TestTaskController> _logger;
        private readonly ImageContext _context;
        private static List<Image> DataList = new List<Image>() {
                new Image {
                    Id = 1,
                    Src = "img/nintchdbpict000177689785.jpg",
                    Descr = "Queen Elizabeth",
                    Lat = 25.262283665613012,
                    Long = 55.28102574386779
                },
                new Image {
                    Id = 2,
                    Src = "img/Queen-Mary-Ship2-678x399.jpg",
                    Descr = "Queen Mary",
                    Lat = 33.7528882877576,
                    Long = -118.18976604985308
                },
                new Image {
                    Id = 3,
                    Src = "img/1024px-The_Cutty_Sark_2005-01-24.jpg",
                    Descr = "Cutty Sark",
                    Lat = 51.48288562451109,
                    Long = -0.009602016066953408
                },
                new Image {
                    Id = 4,
                    Src = "img/Dar-Pomorza.jpg",
                    Descr = "Dar Pomorza",
                    Lat = 54.51963008070638,
                    Long = 18.55284670392696
                },
                new Image {
                    Id = 5,
                    Src = "img/Royal-Yacht-Britannia-e1593443668468-1024x500.jpg",
                    Descr = "The Royal Yacht Britannia",
                    Lat = 55.98231143951744,
                    Long = -3.1772518154134617
                },
                new Image {
                    Id = 6,
                    Src = "img/Discovery.jpg",
                    Descr = "Discovery",
                    Lat = 56.45692619861102,
                    Long = -2.9679623365134353
                },
                new Image {
                    Id = 7,
                    Src = "img/uss-constitution-167366cf2fa4cd30.jpg",
                    Descr = "Constitution",
                    Lat = 42.37246479091648,
                    Long = -71.0565651081412
                },
                new Image {
                    Id = 8,
                    Src = "img/Japanese_battleship_Mikasa_in_Yokohama.jpg",
                    Descr = "Mikasa",
                    Lat = 35.285225496055794,
                    Long = 139.67435824746588
                },
                new Image {
                    Id = 9,
                    Src = "img/main-qimg-5052ea1fb9f097167cee4763009d5f06.jfif",
                    Descr = "United States",
                    Lat = 39.91853499023072,
                    Long = -75.13661747002956
                }
            };

        public TestTaskController(ILogger<TestTaskController> logger, ImageContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public Image Post(IFormFile file)
        {

            /*var filePath = Path.GetTempFileName();*/
            string src = null;
            if (file.Length > 0)
            {

                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    src = "data:" + file.ContentType + ";base64," + Convert.ToBase64String(fileBytes);
                }

                var img = new Image();
                img.Id = DataList.Count + 1;
                img.Src = src;
                img.Descr = "Something";
                img.Lat = 12345;
                img.Long = 67890;

                DataList.Add(img);

                return img;
            }

            return null;
        }

        [HttpGet]
        public IEnumerable<Image> Get()
        {
            //Console.WriteLine("Get() started");
            //return DataList.ToArray();
            return _context.Images.ToArray();
        }

        [HttpGet("{id}")]
        public Image Get(long id)
        {
            return _context.Images
                .Where(x => x.Id == id)
                .FirstOrDefault();
        }

        [HttpPut]
        public IActionResult Put(Image updatedImage)
        {
            _context.Images.Update(updatedImage);
            _context.SaveChanges();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Console.WriteLine("Delete() started");
            foreach (var d in DataList)
            {
                if (d.Id == id)
                {
                    DataList.Remove(d);
                    return NoContent();
                }
            }

            return NotFound();
        }
    }
}
