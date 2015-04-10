namespace Service.Constants
{
    public class WaterSupplyConstant
    {
        public static int PerPersonYearlyWaterRequirmentInLitre = 40 * 1000;
        public static int PerPersonDailyWaterRequirmentInLitre = (int)(PerPersonYearlyWaterRequirmentInLitre / 365.25);
    }
}
