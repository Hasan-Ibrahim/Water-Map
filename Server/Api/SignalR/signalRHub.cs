using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using Api.AccessControl;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Api.SignalR
{
    [HubName("signalRHub")]
    public class SignalRHub : Hub
    {
        private static ConcurrentDictionary<string, List<int>> _mapping = new ConcurrentDictionary<string, List<int>>();


        public override Task OnConnected()
        {
            _mapping.TryAdd(Context.ConnectionId, new List<int>());
            var user = (ActiveUser)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(ActiveUser));
            var userId = user.UserId.ToString();
            Groups.Add(Context.ConnectionId, userId);
            return base.OnConnected();
        }

        public void SendMessage(string message)
        {
            Clients.All.getMessage(message);
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            List<int> list;
            _mapping.TryRemove(Context.ConnectionId, out list);
            Clients.All.removeConnection(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}
