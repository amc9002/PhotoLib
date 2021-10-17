using System;

namespace TestTask
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }

    public class FakeData
    {
        public long Id { get; set; }
        public string Src { get; set; }
        public string Descr { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    } 

}
