using System;
using System.Data.Entity.Spatial;
using Newtonsoft.Json;

namespace Service.Serialization
{
    public class GeometryConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var dbGeometry = value as DbGeometry;

            serializer.Serialize(writer, dbGeometry == null || dbGeometry.IsEmpty ? null : dbGeometry.AsText());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
                return default(DbGeometry);

            var jobject = reader.Value;
            var wkt = jobject.ToString();
            
            if (string.IsNullOrWhiteSpace(wkt))
            {
                return default(DbGeometry);
            }

            var geometry = DbGeometry.FromText(wkt);
            return geometry;
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(DbGeometry);
        }
    }
}
