using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MetadataExtractor;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestTask.Models;
using System.Text.Json;

namespace TestTask.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestTaskController : ControllerBase
    {
        private readonly ILogger<TestTaskController> _logger;
        private readonly ImageContext _context;

        public TestTaskController(ILogger<TestTaskController> logger, ImageContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public IActionResult Post(IFormFile file)
        {
            string src = null;
            if (file != null && file.Length > 0)
            {
                string jsonExif;
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    if (IsValidImage(fileBytes))
                    {
                        src = "data:" + file.ContentType + ";base64," + Convert.ToBase64String(fileBytes);

                        using (var streamForExtractingExif = new MemoryStream(fileBytes))
                        {
                            var exif = ImageMetadataReader.ReadMetadata(streamForExtractingExif);
                            jsonExif = JsonSerializer.Serialize(exif);
                        }
                        var img = new Image();
                        img.Src = src;
                        img.Descr = "Something";
                        img.Exif = jsonExif;

                        _context.Images.Add(img);
                        _context.SaveChanges();

                        return Ok(img);
                    }
                    else
                    {
                        return BadRequest("Not valid type of file");
                    }
                }
            }
            return BadRequest("File is empty or doesn't exist");
        }

        private bool IsValidImage(byte[] filebytes)
        {
            using (var streamForValidation = new MemoryStream(filebytes))
                try
                {
                    var isValidImage = System.Drawing.Image.FromStream(streamForValidation);
                }
                catch
                {
                    return false;
                }

            return true;
        }


        [HttpGet]
        public IEnumerable<Image> Get()
        {
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
        public IActionResult Put(Image updatedDescrImage)
        {
            Image imageForUpdating = _context.Images
                .Where(x => x.Id == updatedDescrImage.Id)
                .FirstOrDefault();
            imageForUpdating.Descr = updatedDescrImage.Descr;
            _context.Images.Update(imageForUpdating);
            _context.SaveChanges();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Image imageToRemove = _context.Images
                .Where(x => x.Id == id)
                .FirstOrDefault();
            _context.Images.Remove(imageToRemove);
            _context.SaveChanges();

            return NotFound();
        }
    }
}
