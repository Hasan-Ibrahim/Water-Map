using Data.Model;

namespace Service.WaterSupply
{
    public class StressByLocation
    {
        public string Location { get; set; }
        public double StressIndex { get; set; }
        
        public static StressByLocation FromDbDailyAverageSupplySummary(DbDailyAverageSupplySummary summary)
        {
            return new StressByLocation
            {
                Location = summary.Location.AsText(),
                StressIndex = summary.StressIndex
            };
        }
    }
}
