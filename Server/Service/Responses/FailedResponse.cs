namespace Service.Responses
{
    public class FailedResponse
    {
        private readonly string _message;

        public FailedResponse(string message)
        {
            _message = message;
        }

        public bool Failed { get { return true; } }
        public string Message { get { return _message; } }
    }
}
