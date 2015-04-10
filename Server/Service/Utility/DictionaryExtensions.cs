using System.Collections.Generic;

namespace Service.Utility
{
    public static class DictionaryExtensions
    {
        public static TValue GetEnsure<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key,
            TValue defaultValue)
        {
            if (!dictionary.ContainsKey(key))
            {
                dictionary[key] = defaultValue;
            }

            return dictionary[key];
        }
    }
}
