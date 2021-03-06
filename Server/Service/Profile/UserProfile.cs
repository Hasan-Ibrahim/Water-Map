﻿using Data.Model.Authentication;

namespace Service.Profile
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string LoginId { get; set; }
        public bool IsAuthenticated { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsOAuthUser { get; set; }
        public string Address { get; set; }

        public UserProfile()
        {

        }

        public UserProfile(DbUser dbUser)
        {
            if (dbUser == null)
            {
                IsAuthenticated = false;
                Id = 0;
                FullName = "Anonymous";
                IsOAuthUser = false;
            }
            else
            {
                IsAuthenticated = true;
                Id = dbUser.Id;
                LoginId = dbUser.LoginId;
                FullName = dbUser.FullName;
                PhoneNumber = dbUser.PhoneNumber;
                IsOAuthUser = dbUser.IsOAuthUser;
                Address = dbUser.Address;
            }
        }
    }
}
