using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/release").Include(
                      "~/Scripts/Lib/jquery-2.1.3.js",
                      "~/Scripts/Lib/jquery.signalR-2.2.0.js",
                      "~/Scripts/Lib/bootstrap.js",
                      "~/Scripts/Lib/angular.js",
                      "~/Scripts/Lib/angular-route.js",
                      "~/Scripts/Lib/ui-bootstrap-tpls.js",
                      "~/Scripts/Lib/angular-toastr.js",
                      "~/Scripts/Lib/faker.min.js",
                      "~/Scripts/Lib/underscore.js",
                      "~/Scripts/Lib/angular-file-upload.js",
                      
                      "~/Scripts/Directives/directiveModule.js",
                      "~/Scripts/Directives/googleMapGeoCoder.js",
                      "~/Scripts/Directives/ratingDisplay.js",
                      
                      "~/Scripts/App/Utility/utilityModule.js",
                      "~/Scripts/App/Utility/tokenStorage.js",
                      "~/Scripts/App/Utility/accessControl.js",
                      "~/Scripts/App/Utility/requestInterceptor.js",
                      "~/Scripts/App/Utility/toastrConfig.js",
                      "~/Scripts/App/Utility/urlResolver.js",
                      "~/Scripts/App/Utility/validationService.js",
                      "~/Scripts/App/appModule.js",
                      "~/Scripts/App/appInit.js",
                      "~/Scripts/App/appRoute.js",
                      "~/Scripts/App/Layout/Controllers/navigationController.js",
                      "~/Scripts/App/Category/Controllers/categoryListController.js",
                      "~/Scripts/App/Category/Controllers/categoryController.js",
                      "~/Scripts/App/Layout/Services/navigationService.js",
                      
                      "~/Scripts/App/Home/Controllers/homeController.js",
                      
                      "~/Scripts/App/Account/Controllers/registrationController.js",
                      "~/Scripts/App/Account/Controllers/loginController.js",
                      "~/Scripts/App/Account/Controllers/changePasswordController.js",
                      "~/Scripts/App/Account/Services/accountService.js",
                      "~/Scripts/App/Account/Services/accountRepository.js",
                      
                      "~/Scripts/App/UserProfile/Controllers/userProfileController.js",
                      "~/Scripts/App/UserProfile/Services/userProfileService.js",
                      "~/Scripts/App/UserProfile/Services/userProfileRepository.js",

                      "~/Scripts/App/SignalR/messageListService.js",
                      "~/Scripts/App/SignalR/signalrService.js",
                      "~/Scripts/App/SignalR/signalrTestController.js",

                      "~/Scripts/Filters/currency.js",
                      "~/Scripts/Filters/truncate.js",
                      
                      "~/Scripts/App/UserProfile/Controllers/sellerProfileController.js",
                      "~/Scripts/App/UserProfile/Controllers/buyerProfileController.js"
                    ));

            bundles.Add(new StyleBundle("~/Css/release").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",
                      "~/Content/font-awesome.css",
                      "~/Content/angular-toastr.css",
                      "~/Content/site.css"));
        }
    }
}
