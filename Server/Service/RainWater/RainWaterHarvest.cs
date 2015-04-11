using System;
using System.Collections.Generic;
using System.IO;

namespace Service.RainWater
{

    public class LatLng
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    public class Position
    {
        public int Row { get; set; }
        public int Column { get; set; }
    }

    public class RainWaterHarvest
    {
        private readonly string _trmmFilePath;

        public RainWaterHarvest(string trmmFilePath)
        {
            _trmmFilePath = trmmFilePath;
        }

        public Dictionary<int, Dictionary<int, double>> CalculateRainWaterHarvest(IDictionary<int, IDictionary<int, double>> userAreas)
        {
            var rainData = new DataDictionaryGenerator().Generate(_trmmFilePath);

            var hrwData = new Dictionary<int, Dictionary<int, double>>();
            foreach (var rowNumber in userAreas.Keys)
            {
                var row = userAreas[rowNumber];
                foreach (var columnNumber in row.Keys)
                {
                    var area = row[columnNumber];
                    var position = GetPositionForPoint5Degree(new Position { Row = rowNumber, Column = columnNumber });
                    var rdmm = 0.0;
                    if (rainData.ContainsKey(position.Row) && rainData[position.Row].ContainsKey(position.Column))
                    {
                        rdmm = rainData[position.Row][position.Column];
                    }
                    var hrw = 0.0008 * rdmm * area;

                    if(Math.Abs(hrw) < .0000001)
                        continue;
                    if (!hrwData.ContainsKey(rowNumber))
                    {
                        hrwData[rowNumber] = new Dictionary<int, double>();
                    }
                    hrwData[rowNumber][columnNumber] = Math.Round(hrw, 4);
                }
            }

            return hrwData;
        }

        public Position GetPositionForPoint5Degree(Position posPoint1Degree)
        {
            var row = (int)Math.Floor((posPoint1Degree.Row - 2.0) / 5);
            var column = (int)Math.Floor((posPoint1Degree.Column - 2.0) / 5);
            return new Position { Row = row, Column = column };
        }

        public LatLng GetPoint1DegreeLatLng(int rowNumber, int columnNumber)
        {
            var config = new { startLng = -179.95, startLat = 89.95, columnCount = 3600, cellGap = 0.1, arrayName = "addressPoints" };
            var latlng = new LatLng
                         {
                             Lat = config.startLat - rowNumber * config.cellGap,
                             Lng = config.startLng + columnNumber * config.cellGap
                         };
            return latlng;
        }
    }

    public class DataDictionaryGenerator
    {
        public Dictionary<int, Dictionary<int, double>> Generate(string filePath)
        {
            var lines = File.ReadAllLines(filePath);
            var dict = new Dictionary<int, Dictionary<int, double>>();
            for (var rowNumber = 0; rowNumber < lines.Length; rowNumber++)
            {
                var line = lines[rowNumber];
                var values = line.Split(',');
                for (var columnNumber = 0; columnNumber < values.Length; columnNumber++)
                {
                    var value = values[columnNumber];
                    if (value == "99999")
                        continue;
                    if (!dict.ContainsKey(rowNumber))
                    {
                        dict[rowNumber] = new Dictionary<int, double>();
                    }
                    dict[rowNumber][columnNumber] = Double.Parse(value);
                }
            }
            return dict;
        }
    }
}
