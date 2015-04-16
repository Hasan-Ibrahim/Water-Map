using System.Runtime.Serialization;

namespace Data.Model.Constants
{
    public enum Accessibility
    {
        [EnumMember(Value = "Accessible")]
        Accessible = 0,

        [EnumMember(Value = "Damaged")]
        Damages = 1,

        [EnumMember(Value = "Sedimented")]
        Sediment = 2,

        [EnumMember(Value = "Polluted by industrial waste")]
        IndustrialWaste = 3,

        [EnumMember(Value = "Polluted by agricultural waste")]
        AgriculturalWaste = 4,

        [EnumMember(Value = "Polluted by chemical")]
        Chemical = 5,

        [EnumMember(Value = "Polluted by other reason")]
        Others = 1000
    }
}
