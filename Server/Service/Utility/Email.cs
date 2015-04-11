using System.Net.Mail;

namespace Service.Utility
{
    public class Email
    {
        private readonly MailMessage _message;

        public Email(MailMessage message)
        {
            _message = message;
        }

        public void Send()
        {
            var smtpClient = new SmtpClient();
            smtpClient.SendCompleted += (sender, args) => ((SmtpClient)sender).Dispose();
            smtpClient.SendAsync(_message, null);
        }
    }
}