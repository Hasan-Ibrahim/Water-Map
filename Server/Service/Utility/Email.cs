using System.Net.Mail;
using System.Threading.Tasks;

namespace Service.Utility
{
    public class Email
    {
        private readonly MailMessage _message;

        public Email(MailMessage message)
        {
            _message = message;
        }

        public async Task Send()
        {
            using (var smtpClient = new SmtpClient())
            {
                await smtpClient.SendMailAsync(_message);
            }
        }
    }
}