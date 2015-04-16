using System.Runtime.Serialization;

namespace Data.Model.Constants
{
    public enum Potability
    {
        [EnumMember(Value = "Drinkable")]
        Drinkable = 1000,

        [EnumMember(Value = "Needs treatment")]
        NeedTreatment = 900,

        [EnumMember(Value = "Unknown")]
        Unknown = 0,

        [EnumMember(Value = "Undrinkable")]
        Undrinkable = -1000,
    }
}
