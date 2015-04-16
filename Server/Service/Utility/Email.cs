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
            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Send(_message);
            }
        }
    }
}